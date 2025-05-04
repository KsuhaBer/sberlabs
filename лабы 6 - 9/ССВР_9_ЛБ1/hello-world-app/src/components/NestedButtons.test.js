import React from "react";
import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { render, fireEvent, screen } from "@testing-library/react";
import NestedButtons from "./NestedButtons";

beforeEach(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("NestedButtons", () => {
  it("вызывает оба alert при bubbleToOuter = true", () => {
    render(
      <NestedButtons
        bubbleToOuter={true}
        onOuterClick={() => alert("Нажата внешняя кнопка")}
        onInnerClick={() => alert("Нажата внутренняя кнопка")}
      />
    );

    fireEvent.click(screen.getByText("Внутренняя кнопка")); //симулирует клик по DOM-элементу с текстом "Внутренняя кнопка"

    expect(window.alert).toHaveBeenCalledWith("Нажата внутренняя кнопка");
    expect(window.alert).toHaveBeenCalledWith("Нажата внешняя кнопка");
  });

  it("вызывает только inner alert при bubbleToOuter = false", () => {
    render(
      <NestedButtons
        bubbleToOuter={false}
        onOuterClick={() => alert("Нажата внешняя кнопка")}
        onInnerClick={() => alert("Нажата внутренняя кнопка")}
      />
    );

    fireEvent.click(screen.getByText("Внутренняя кнопка"));

    expect(window.alert).toHaveBeenCalledWith("Нажата внутренняя кнопка");
    expect(window.alert).not.toHaveBeenCalledWith("Нажата внешняя кнопка");
  });
});
