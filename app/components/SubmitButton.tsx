import { type FetcherWithComponents, useNavigation } from "@remix-run/react";
import { SendouButton, type SendouButtonProps } from "./elements/Button";

interface SubmitButtonProps extends SendouButtonProps {
	/** If the page has multiple forms you can pass in fetcher.state to differentiate when this SubmitButton should be in submitting state */
	state?: FetcherWithComponents<any>["state"];
	_action?: string;
	testId?: string;
}

export function SubmitButton({
	children,
	state,
	_action,
	testId,
	...rest
}: SubmitButtonProps) {
	const navigation = useNavigation();

	const isSubmitting = state ? state !== "idle" : navigation.state !== "idle";

	const name = () => {
		if (rest.name) return rest.name;
		if (_action) return "_action";

		return undefined;
	};

	const value = () => {
		if (rest.value) return rest.value;
		if (_action) return _action;

		return undefined;
	};

	return (
		<SendouButton
			{...rest}
			isDisabled={rest.isDisabled || isSubmitting}
			type="submit"
			name={name()}
			value={value()}
			data-testid={testId ?? "submit-button"}
		>
			{children}
		</SendouButton>
	);
}
