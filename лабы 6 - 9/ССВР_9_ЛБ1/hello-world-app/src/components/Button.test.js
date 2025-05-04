import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MainPage from './MainPage';
import Button from './Button';
import InnerButton from './InnerButton';
import '@testing-library/jest-dom';

// Мокаем глобальный alert перед всеми тестами
beforeAll(() => {
  window.alert = jest.fn();
});

// Очищаем моки после каждого теста
afterEach(() => {
  jest.clearAllMocks();
});

describe('Button Component', () => {
  it('должен отображать переданный текст', () => {
    render(<Button>Тестовая кнопка</Button>);
    expect(screen.getByText('Тестовая кнопка')).toBeInTheDocument();
  });

  it('должен вызывать onClick при клике', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Нажать</Button>);
    
    fireEvent.click(screen.getByText(/Нажать/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('InnerButton Component', () => {
  it('должен отображать переданный текст', () => {
    render(<InnerButton>Внутренняя</InnerButton>);
    expect(screen.getByText('Внутренняя')).toBeInTheDocument();
  });

  it('должен вызывать onClick и останавливать всплытие', () => {
    const handleClick = jest.fn(e => e.stopPropagation());
    const parentHandleClick = jest.fn();
    
    render(
      <div onClick={parentHandleClick}>
        <InnerButton onClick={handleClick}>Тест</InnerButton>
      </div>
    );
    
    fireEvent.click(screen.getByText('Тест'));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(parentHandleClick).not.toHaveBeenCalled();
  });
});

describe('MainPage Component', () => {
  it('должен отображать заголовок и приветствие', () => {
    render(<MainPage />);
    expect(screen.getByText('Главная страница')).toBeInTheDocument();
    expect(screen.getByText(/Добро пожаловать/i)).toBeInTheDocument();
  });

  it('должен вызывать alert при клике на внешнюю кнопку', () => {
    render(<MainPage />);
    
    // Находим по тексту "Внешняя кнопка" в параграфе
    const outerButton = screen.getByText(/Внешняя кнопка/i).parentElement;
    fireEvent.click(outerButton);
    
    expect(window.alert).toHaveBeenCalledWith('Внешняя кнопка нажата!');
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать alert только внутренней кнопки при клике на неё', () => {
    render(<MainPage />);
    
    const innerButton = screen.getByText('Внутренняя кнопка');
    fireEvent.click(innerButton);
    
    expect(window.alert).toHaveBeenCalledWith('Внутренняя кнопка нажата!');
    expect(window.alert).toHaveBeenCalledTimes(1);
  });

  it('НЕ должен вызывать два alert при клике на внутреннюю кнопку', () => {
    render(<MainPage />);
    
    const innerButton = screen.getByText('Внутренняя кнопка');
    fireEvent.click(innerButton);
    
    // Проверяем что был вызван только alert внутренней кнопки
    expect(window.alert).toHaveBeenCalledWith('Внутренняя кнопка нажата!');
    expect(window.alert).not.toHaveBeenCalledWith('Внешняя кнопка нажата!');
    expect(window.alert).toHaveBeenCalledTimes(1);
  });
});

describe('Button with InnerButton integration', () => {
  it('должен корректно обрабатывать клики по разным областям', () => {
    render(
      <Button onClick={() => alert('Внешняя')}>
        <InnerButton onClick={() => alert('Внутренняя')}>Тест</InnerButton>
      </Button>
    );
    
    // Клик по внутренней кнопке
    fireEvent.click(screen.getByText('Тест'));
    expect(window.alert).toHaveBeenCalledWith('Внутренняя');
    expect(window.alert).toHaveBeenCalledTimes(1);
    
    // Клик по внешней кнопке (но не по внутренней)
    const outerButton = screen.getByText(/Внешняя кнопка/i).parentElement;
    fireEvent.click(outerButton);
    expect(window.alert).toHaveBeenCalledWith('Внешняя');
    expect(window.alert).toHaveBeenCalledTimes(2);
  });
});