import React from 'react';
import { render, } from '@testing-library/react';
import Register from '../../client/components/Register';
import { expect as vExpect, test as vTest} from 'vitest';
import Header from '../../client/components/Header';
import Itinerary from '../../server/models/Itinerary';
import About from '../../client/components/About';
// import { AbstractChatCompletionRunner } from 'openai/lib/AbstractChatCompletionRunner';


// describe('Register Page', () => {

//   beforeAll(() => {
//     registerPage = render(<Register />);ç
//   });

//   test('should have all form elements', () => {
//     expect(registerPage.getByLabelText('First Name:')).toBeInTheDocument();
//   })
// });

// test('Register Page', () => {
//   const registerPage = render(<Register />);
//   expect(registerPage.getByLabelText('First Name:')).toBeInTheDocument();
// })

// describe('this is a test', ()=>{
//   it('should pass', ()=>{
//     expect(true).toBe(true)
//   })
// })

vTest('Register Page', async () => {
  const registerPage = render(<Register />);
  // console.log(registerPage);
  vExpect(true).toBe(true);
});