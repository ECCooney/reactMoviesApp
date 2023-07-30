import React from "react";
import SignupForm from "../components/signup";
import { MemoryRouter } from "react-router";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 360000,
			refetchInterval: 360000,
			refetchOnWindowFocus: false,
		},
	},
});

export default {
	title: "Signup/Signup form",
	component: SignupForm,
	decorators: [
		(Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
		(Story) => (
			<QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>
		),
	],
};

export const Basic = () => <SignupForm />;
