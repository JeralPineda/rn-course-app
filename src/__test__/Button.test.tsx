import Button from "@/components/Button";
import { fireEvent, render, screen } from "@testing-library/react-native";

test("Button.tsx test", () => {
  const mockOnPress = jest.fn();
  render(
    <Button testId="testButton" onPress={mockOnPress}>
      test
    </Button>
  );

  const button = screen.getByTestId("testButton");
  fireEvent.press(button);

  console.log(button.props);

  expect(button.props.style.borderRadius).toBe(12);
  expect(mockOnPress).toHaveBeenCalled();
  expect(button).toBeTruthy();
});
