import {act, fireEvent, render, screen} from '@testing-library/react';
import App from './App';

import axios from 'axios';
axios.defaults.baseURL='http://localhost:3001';

beforeEach(() => {
  render(<App />);
})

test('renders login link', () => {
  const linkElement = screen.getByText(/log in/i);
  expect(linkElement).toBeInTheDocument();
});

test('render form buttons', () => {
  const generateButton = screen.getByText(/generate/i);
  const submitButton = screen.getByText(/submit/i);
  expect(generateButton).toBeDefined();
  expect(submitButton).toBeDisabled();
});

test('clicking form buttons', async () => {
  const generateButton = screen.getByText(/generate/i);
  await act( async () => {
    generateButton.click();
  });
  await new Promise(resolve => setTimeout(resolve, 1000));
  const errors = screen.getAllByText(/is required/i);
  expect(errors.length).toBeGreaterThan(0);
});

test('fill in form then generate', async () => {
  const firstNameInput = screen.getByLabelText('firstName');
  fireEvent.change(firstNameInput, {target: {value: 'Test'}});
  const lastNameInput = screen.getByLabelText('lastName');
  fireEvent.change(lastNameInput, {target: {value: 'Civilian'}});
  const dateOfBirthInput = screen.getByLabelText('dateOfBirth');
  fireEvent.change(dateOfBirthInput, {target: {value: '1998-09-21'}});
  const emailInput = screen.getByLabelText('email');
  fireEvent.change(emailInput, {target: {value: 'test@email.com'}});
  const idNumberInput = screen.getByLabelText('idNumber');
  fireEvent.change(idNumberInput, {target: {value: '020099003439'}});
  const brandInput = screen.getByLabelText('brand');
  fireEvent.change(brandInput, {target: {value: 'ALLMIND'}});
  const modelInput = screen.getByLabelText('model');
  fireEvent.change(modelInput, {target: {value: 'Steel Haze'}});
  const provinceInput = screen.getByLabelText('province');
  fireEvent.mouseDown(provinceInput, {});
  const provinceOption = screen.getByText('Hà Nội');
  fireEvent.click(provinceOption, {});
  const generateButton = screen.getByText(/generate/i);
  await act( async () => {
    generateButton.click();
  });
  await new Promise(resolve => setTimeout(resolve, 100));
  const licensePlate = screen.getByLabelText('generated-plate');
  const submitButton = screen.getByText(/submit/i);
  expect(licensePlate.value).not.toBe('');
  expect(submitButton).not.toBeDisabled();
})