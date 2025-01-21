import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import NavBar from './NavBar.js';

describe('NavBar component testing', () => {

    test.todo('Testing in progress');   // Works!!! 

    test('Renders the NavBar component correctly', () => {
        render(<NavBar />)

        // Checking that the title is there
        expect(screen.getByText('REST-API-BANK')).toBeInTheDocument();
        
        // Checking that the button is there
        expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
        });

    // Checking the customerId output
    test('Displays customerId when available', () => {
        render(<NavBar customerId='12345'/>)
    
        // Checking the display of customerId
        expect(screen.getByText(/Customer 12345/i)).toBeInTheDocument();
    });

    // Checking if a new component appears when a button is clicked
    test('Displays the new component when button is clicked', async () => {
        render(<NavBar />)

        // Make sure the component is not there yet
        expect(document.querySelector('#pw')).toBeNull();

        // Find the button and click on it
        const button = screen.getByRole('button', { name: /Log in/i });
        await userEvent.click(button);

        // Check that the component has appeared
        expect(document.querySelector('#pw')).toBeInTheDocument();
    })
})
