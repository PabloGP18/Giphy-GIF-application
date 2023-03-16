import { act, renderHook } from "@testing-library/react";
import useForm from "./useFormHook";

test("should change keyword", () => {
  const { result } = renderHook(() => useForm());

  // act is going to simulate how react is "acting". So if the updateKeyword is async it doens't act like a sync function
  act(() => {
    result.current.updateKeyword("matrix");
  });

  expect(result.current.keyword).toBe("matrix");
});

test("should use inital values", () => {
  const { result } = renderHook(() =>
    useForm({
      initialKeyword: "matrix",
    })
  );

  expect(result.current.keyword).toBe("matrix");
});

test("should update correctly times when used twice", () => {
  const { result } = renderHook(() =>
    useForm({
      initialKeyword: "matrix",
    })
  );

  act(() => {
    result.current.updateKeyword("m");
    result.current.updateKeyword("ma");
  });

  expect(result.current.keyword).toBe("ma");
  expect(result.current.times).toBe(2);
});

// you can also use like a "setup" function so dat you don't have to call everythime the renderHook...

const setup = (params) => renderHook(() => useForm(params));

test("should use initial values", () => {
  const { result } = setup({
    initialLanguage: "en",
  });

  expect(result.current.language).toBe("en");
});
