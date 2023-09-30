"use client"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { collection, addDoc, getDoc,deleteDoc,doc,QuerySnapshot, query, onSnapshot } from "firebase/firestore"; // import from firebase/firestore
import { db } from "./firebase";

export default function Home() {

  const [expenses, setExpenses] = useState([
    // { id: 1, name: "Rent", amount: 500 },
    // { id: 2, name: "Car", amount: 200 },
   
  ])

  const [newExpense, setnewExpense] = useState({ name: '', amount: '' })
  const [total, setTotal] = useState(0)

  //add
  const addExpense = async (e) => {
    e.preventDefault()
    if (newExpense.name !== '' && newExpense.amount !== '') {
      // setExpenses([...expenses, newExpense])
      // setnewExpense({ name: '', amount: '' })
      await addDoc(collection(db, "expenses"), { 
        name: newExpense.name.trim(),
        amount: newExpense.amount,
      });
      setnewExpense({ name: '', amount: '' })
    }
    
  }

//read
useEffect(() => {
  const q = query(collection(db, "expenses"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let expensesArr = []

    querySnapshot.forEach((doc) => {
      expensesArr.push({ ...doc.data(), id: doc.id })
    })
    setExpenses(expensesArr)


    //read total from expensesArr
    const calculateTotal = () => {  
      let total = 0
      expensesArr.forEach((expense) => {
        total += parseInt(expense.amount)
      })
      setTotal(total)
    }
    calculateTotal()
    return ()=> unsubscribe();
  })
}, []);

//delete
const deleteExpense = async (id) => {
  await deleteDoc(doc(db, "expenses", id));
}


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <h1 className='text-4xl p4 text-center'>Xpenso</h1>
        <p className='text-xs p4 text-center'>Simple Expenses Tracking App, By <span className="font-semibold text-teal-300">Zijja</span></p>
        <div className='p-4'>
          <form className='grid grid-cols-6 items-center text-black '>
            <input 
            value={newExpense.name}
            onChange={(e) => setnewExpense({ ...newExpense, name: e.target.value })}
            type='text'
            placeholder='Enter Expense'
            className='col-span-3 border-r p-3 rounded-l-xl' 
            />
            <input 
            value={newExpense.amount}
            onChange={(e) => setnewExpense({ ...newExpense, amount: e.target.value })}
            type='number'
            placeholder='Enter $'
            className='col-span-2 border-r p-3'
            />
            <button 
            onClick={addExpense}
            type='submit'
            className='bg-rose-500 hover:bg-rose-600 p-1 font-extrabold rounded-r-xl text-white text-4xl'>+</button>
          </form>
          {/* <form className='grid grid-cols-6 items-center text-black mt-5 '>
            <input type='text' placeholder='Enter Expense' className='col-span-3 border-r p-3 rounded-l-xl' />
            <input type='number' placeholder='Enter $' className='col-span-2 border-r p-3' />
            <button type='submit' className='bg-teal-500 hover:bg-teal-600 p-1 font-extrabold rounded-r-xl text-white text-4xl'>+</button>
          </form> */}

          <ul className="mt-10 w-80 mx-auto">
            {expenses.map((expense) => (
              <li key={expense.id} className='justify-between grid grid-cols-6'>
                <span className='col-span-3 border-r capitalize'>{expense.name}</span>
                <span className='col-span-2 pl-3'>${expense.amount}</span>
                <button 
                onClick={() => deleteExpense(expense.id)}
                className='text-gray-400 border-2 w-6 h-6 text-center rounded-full bg-gray-700 col-span-1 text-sm font-extrabold mb-1 hover:text-white hover:bg-rose-400 cursor-pointer  '>X</button>
              </li>
            ))
            }
          </ul>
          {expenses.length > 0 &&
            <div className='mt-5 text-center'>
              <span className='text-2xl'>Total: </span>
              <span className='text-2xl font-extrabold'>${total}</span>
            </div>
          }
        </div>
      </div>
    </main>
  )
}
