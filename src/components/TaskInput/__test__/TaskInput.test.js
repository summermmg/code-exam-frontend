import { render, screen, fireEvent } from '@testing-library/react';
import TaskInput from "../TaskInput";

const mockedSetItemsData = jest.fn();

const makeInput = (input) => {
    const inputElement = screen.getByLabelText(/add an item:/i);
    fireEvent.click(inputElement);
    fireEvent.change(inputElement, { target: { value: input }});
}

describe('TaskInput', () => {
    test('should render input element', () => {
        render(
            <TaskInput 
                stages={["Idea", "Development", "Testing", "Deployment"]}
                setItemsData={mockedSetItemsData}
            />
        );
        const inputElement = screen.getByLabelText(/add an item:/i);
        expect(inputElement).toBeInTheDocument();
    })

    test('should be able to type into input', () => {
        render(
            <TaskInput 
                stages={["Idea", "Development", "Testing", "Deployment"]}
                setItemsData={mockedSetItemsData}
            />
        );
        const inputElement = screen.getByLabelText(/add an item:/i);
        makeInput("build a new sign-up feature");
        expect(inputElement.value).toBe("build a new sign-up feature");
    })

    test('should be able to set items data when form submitted', () => {
        render(
            <TaskInput 
                stages={["Idea", "Development", "Testing", "Deployment"]}
                setItemsData={mockedSetItemsData}
            />
        );
        makeInput("build a new sign-up feature");
        const formElement = screen.getByRole('form', { name: ""});
        fireEvent.submit(formElement);
        expect(mockedSetItemsData).toBeCalled();
    })

    test('should have empty input after form is submitted', () => {
        render(
            <TaskInput 
                stages={["Idea", "Development", "Testing", "Deployment"]}
                setItemsData={mockedSetItemsData}
            />
        );
        const inputElement = screen.getByLabelText(/add an item:/i);
        makeInput("build a new sign-up feature");
        const formElement = screen.getByRole('form', { name: ""});
        fireEvent.submit(formElement);
        expect(inputElement.value).toBe("");
    })
})
