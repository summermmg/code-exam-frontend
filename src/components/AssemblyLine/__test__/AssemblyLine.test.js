import { render, screen, fireEvent } from '@testing-library/react';
import AssemblyLine from "../AssemblyLine";

// Test interactions between components

const addTask = (tasks) => {
    const inputElement = screen.getByLabelText(/add an item:/i);
    const formElement = screen.getByRole('form', { name: ""});
    tasks.forEach((task) => {
        fireEvent.click(inputElement);
        fireEvent.change(inputElement, { target: { value: task }});
        fireEvent.submit(formElement);
    })
}

describe('AssemblyLine', () => {
    test('should be able to render input task', () => {
        render(
            <AssemblyLine 
                stages={["Idea", "Development", "Testing", "Deployment"]}
            />
        );
        addTask(["build a new sign-up feature"]);
        const liElement = screen.getByText(/build a new sign-up feature/i);
        expect(liElement).toBeInTheDocument()
    })

    test('should be able to render multiple input tasks', () => {
        render(
            <AssemblyLine 
                stages={["Idea", "Development", "Testing", "Deployment"]}
            />
        );
        addTask([
            "build a new sign-up feature",
            "build a new sign-up feature",
            "build a new sign-up feature"
        ]);
        const liElements = screen.queryAllByText(/build a new sign-up feature/i);
        expect(liElements.length).toBe(3);
    })
})