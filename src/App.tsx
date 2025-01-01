import {
	Button,
	Container,
	FloatingMessageBlock,
	FormControl,
	HStack,
	Message,
	TextField,
	VStack,
} from "@freee_jp/vibes";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

type Inputs = {
	firstName: string;
	lastName: string;
};

const fetcher = async (_data: Inputs) => {
	const res =
		Math.random() < 0.5
			? {
					status: 400,
					message: "入力内容にエラーがあります。修正のうえ、再度お試しください",
					errors: {
						firstName: "名は必須項目です",
					} as Record<keyof Inputs, string>,
				}
			: {
					status: 200,
					message: "送信が完了しました",
					errors: undefined,
				};

	console.log(res);

	return res;
};

const App = () => {
	const { control, handleSubmit } = useForm<Inputs>({
		defaultValues: {
			firstName: "",
			lastName: "",
		},
	});
	const [status, setStatus] = useState<number | undefined>(undefined);
	const [message, setMessage] = useState<string | undefined>(undefined);
	const [errors, setErrors] = useState<
		Record<keyof Inputs, string> | undefined
	>(undefined);
	const onSubmit: SubmitHandler<Inputs> = useCallback(async (data) => {
		const { status, message, errors } = await fetcher(data);

		setErrors(errors);
		setStatus(status);
		setMessage(message);
	}, []);

	return (
		<Container>
			{message && (
				<FloatingMessageBlock error={status === 400} success={status === 200}>
					{message}
				</FloatingMessageBlock>
			)}
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack>
					<FormControl fieldId="firstName" label="名" required>
						<Controller
							name="firstName"
							control={control}
							render={({ field }) => (
								<HStack>
									<TextField
										id="firstName"
										{...field}
										error={errors?.firstName !== undefined}
									/>
									{errors?.firstName && (
										<Message error>{errors.firstName}</Message>
									)}
								</HStack>
							)}
						/>
					</FormControl>

					<FormControl fieldId="lastName" label="姓" required>
						<Controller
							name="lastName"
							control={control}
							render={({ field }) => (
								<HStack>
									<TextField
										id="lastName"
										{...field}
										error={errors?.lastName !== undefined}
									/>
									{errors?.lastName && (
										<Message error>{errors.lastName}</Message>
									)}
								</HStack>
							)}
						/>
					</FormControl>

					<Button appearance="primary" type="submit">
						送信
					</Button>
				</VStack>
			</form>
		</Container>
	);
};

export default App;
