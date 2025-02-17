import React, { useContext, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { BACKEND_API } from '@/constants'
import axios from 'axios'
import { Context } from '@/App'

const SearchArea = () => {
	const [token, setToken] = useContext(Context);


	async function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			console.log(token);
			if (!token || token.length === 0) {
				return;
			}
			const res = await axios.get(`${BACKEND_API}/users/?email=${event.currentTarget.value}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});
			
		}

	}

	return (
		<>
			<div className='mb-96'>
				<Input placeholder='Search' className='w-96 h-auto' onKeyDown={handleEnter}/>
			</div>
		</>
	)
}

export default SearchArea
