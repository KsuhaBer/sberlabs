// MainPage.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import Button from './Button';
import InnerButton from './InnerButton';
import '@testing-library/jest-dom';

beforeAll(() => {
  window.alert = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('MainPage Component', () => {
  it('должен отображать заголовок и приветствие', () => {
    render(<MainPage />);
    expect(screen.getByText('Главная страница')).toBeInTheDocument();
    expect(screen.getByText(/Добро пожаловать/i)).toBeInTheDocument();
  });

  it('должен вызывать alert при клике на внешнюю кнопку', () => {
    render(<MainPage />);
    const outerButton = screen.getByText(/Внешняя кнопка/i).parentElement;
    fireEvent.click(outerButton);
    expect(window.alert).toHaveBeenCalledWith('Внешняя кнопка нажата!');
  });

  it('должен вызывать alert только внутренней кнопки при клике на неё', () => {
    render(<MainPage />);
    const innerButton = screen.getByText('Внутренняя кнопка');
    fireEvent.click(innerButton);
    expect(window.alert).toHaveBeenCalledWith('Внутренняя кнопка нажата!');
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});

describe('Button with InnerButton propagation', () => {
  it('должен вызывать оба alert при клике на внутреннюю кнопку с stopPropagation=false', () => {
    render(
      <Button onClick={() => alert('Внешняя кнопка нажата!')}>
        <InnerButton 
          onClick={() => alert('Внутренняя кнопка нажата!')}
          stopPropagation={false}
        >
          Внутренняя кнопка
        </InnerButton>
      </Button>
    );

    const innerButton = screen.getByText('Внутренняя кнопка');
    fireEvent.click(innerButton);

    expect(window.alert.mock.calls).toEqual([
      ['Внутренняя кнопка нажата!'],
      ['Внешняя кнопка нажата!']
    ]);
    expect(window.alert).toHaveBeenCalledTimes(2);
  });
});