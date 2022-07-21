import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import RegisterBtn from './RegistBtn';
import { useState } from 'react';

function SubmissionForm(props) {

	const dataInit = {
		category: props.category,
		lesson_name: props.contentName,
		url: '',
		comment: '',
	}
	const [data, setData] = useState(dataInit);

	const handleChange = (event) => {
		const { name, value } = event.target
		setData(
			{ ...data, [name]: value }
		)
	}

	return (
		<div>
			<Stack spacing={5}>
				<h2>提出フォーム</h2>
				<TextField
					fullWidth
					margin="normal"
					label="カテゴリ"
					variant="outlined"
					size="small"
					name="category"
					defaultValue={data.category}
					disabled
				/>
				<TextField
					fullWidth
					margin="normal"
					label="演習名"
					variant="outlined"
					size="small"
					name="lesson_name"
					defaultValue={data.lesson_name}
					disabled
				/>
				<TextField
					fullWidth
					margin="normal"
					label="提出先URL"
					variant="outlined"
					size="small"
					name="url"
					value={data.url}
					onChange={handleChange}
				/>
				<TextField
					fullWidth
					margin="normal"
					label="コメント"
					variant="outlined"
					multiline
					rows={4}
					name="comment"
					value={data.comment}
					onChange={handleChange}
				/>
				<Stack direction="row" justifyContent="flex-end">
					<RegisterBtn
						mode={'new'}
						endpoint={'submissionLesson'}
						validation={() => true}
						data={data}
					/>
				</Stack>
			</Stack>
		</div>
	);
}

export default SubmissionForm;
