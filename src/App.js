import { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Todo from './Todo'
import { db } from './firebase'
import {
	query,
	collection,
	onSnapshot,
	updateDoc,
	doc,
	addDoc,
	deleteDoc,
} from 'firebase/firestore'

const style = {
	bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
	container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
	heading: `flex items-center justify-center`,
	title: `text-3xl font-bold text-center text-gray-800 p-2`,
	form: `flex justify-between`,
	input: `border p-2 w-full text-xl`,
	button: `border p-4 ml-2 sm:mt-0 bg-purple-500 text-slate-100`,
	count: `text-center p-2`,
}

function App() {
	const [todos, setTodos] = useState([])
	const [input, setInput] = useState('')

	// create todo

	const createTodo = async e => {
		e.preventDefault(e)
		if (input === '') return alert('Please enter a valid todo')
		await addDoc(collection(db, 'todos'), {
			text: input,
			completed: false,
		})
		setInput('')
	}

	// read todo from firebase

	useEffect(() => {
		const q = query(collection(db, 'todos'))
		// is like a picture of our database
		const unsuscribe = onSnapshot(q, querySnapshot => {
			let todosArr = []
			querySnapshot.forEach(doc => {
				todosArr.push({ ...doc.data(), id: doc.id })
			})
			setTodos(todosArr)
		})
		return () => unsuscribe()
	}, [])

	// update todo in firebase

	const toggleComplete = async todo => {
		await updateDoc(doc(db, 'todos', todo.id), {
			completed: !todo.completed,
		})
	}

	// delete todo

	const deleteTodo = async id => {
		await deleteDoc(doc(db, 'todos', id))
	}

	return (
		<div className={style.bg}>
			<div className={style.container}>
				<div className={style.heading}>
					<h3 className={style.title}>Todo App</h3>
					<h1 className={style.subtitle}>(with Firebase Database)</h1>
				</div>
				<form onSubmit={createTodo} className={style.form}>
					<input
						type='text'
						placeholder='Add Todo'
						value={input}
						onChange={e => setInput(e.target.value)}
						className={style.input}
					/>
					<button className={style.button}>
						<AiOutlinePlus size={30} />
					</button>
				</form>
				<ul>
					{todos.map((todo, index) => (
						// todo={todo} is just passing state down in components
						<Todo
							key={index}
							todo={todo}
							toggleComplete={toggleComplete}
							deleteTodo={deleteTodo}
						/>
					))}
				</ul>

				{todos.length < 1 ? null : (
					<p className={style.count}>
						{`You have ${todos.length} todos`}
					</p>
				)}
			</div>
		</div>
	)
}

export default App
