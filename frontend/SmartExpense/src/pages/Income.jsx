/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllIncome,
  getMonthlyIncome,
  getTotalIncome,
  addIncome,
  deleteIncome,
} from "../services/incomeService";
import {
  setIncomes,
  setMonthlyIncome,
  setTotalIncome,
} from "../store/incomeSlice";
import IncomeCard from "../components/income/IncomeCard";
import IncomeChart from "../components/income/IncomeChart";
import IncomeSources from "../components/income/IncomeSources";
import IncomeRecentList from "../components/income/IncomeRecentList";
import AddIncomeModal from "../components/income/AddIncomeModal";
import { Plus } from "lucide-react";

function Income() {
  const dispatch = useDispatch();

  const { incomes, totalIncome, monthlyIncome } = useSelector(
    (store) => store.income
  );

  const [showModal, setShowModal] = useState(false);

  const fetchIncome = async () => {
    try {
      const incomeResponse = await getAllIncome();
      const totalResponse = await getTotalIncome();
      const monthlyResponse = await getMonthlyIncome();

      dispatch(setIncomes(incomeResponse.data.data));
      dispatch(setTotalIncome(totalResponse.data.data));
      dispatch(setMonthlyIncome(monthlyResponse.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  // load income data when page opens
  useEffect(() => {
    fetchIncome();
  }, []);

  const handleAdd = async (data) => {
    await addIncome({
      ...data,
      amount: Number(data.amount),
      currency: "INR",
    });
    setShowModal(false);
    fetchIncome();
  };

  const handleDelete = async (id) => {
    await deleteIncome(id);
    fetchIncome();
  };

  // find income for the current month
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });

  let currentMonthIncome = 0;
  const currentMonthEntry = monthlyIncome.find(
    (item) => item.month === currentMonth
  );
  if (currentMonthEntry) {
    currentMonthIncome = currentMonthEntry.amount;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">Income</h1>
          <p className="page-subtitle">Monitor your earnings and sources</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={18} />
          Add Income
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <IncomeCard
          title="Monthly Income"
          value={"₹" + currentMonthIncome.toLocaleString("en-IN")}
        />

        <IncomeCard
          title="Transactions"
          value={incomes.length}
        />

        <IncomeCard
          title="This Year"
          value={"₹" + Number(totalIncome).toLocaleString("en-IN")}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <IncomeChart data={monthlyIncome} />
        <IncomeSources incomes={incomes} />
      </div>

      <IncomeRecentList
        incomes={incomes}
        onDelete={handleDelete}
        onEdit={() => { }}
      />

      {showModal && (
        <AddIncomeModal
          onSubmit={handleAdd}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default Income;
