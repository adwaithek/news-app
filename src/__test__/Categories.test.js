import { render, screen, fireEvent } from "@testing-library/react";
import Categories from "../categories"; // Adjust the path if needed
import { useNews } from "@/context/NewsContext";
import { useRouter } from "next/navigation";

 
jest.mock("@/context/NewsContext", () => ({
  useNews: jest.fn(),
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Categories Component", () => {
  let mockSetCategory;
  let mockPush;

  beforeEach(() => {
    mockSetCategory = jest.fn();
    mockPush = jest.fn();

    useNews.mockReturnValue({ category: "general", setCategory: mockSetCategory });
    useRouter.mockReturnValue({ push: mockPush });
  });

  it("renders category buttons", () => {
    render(<Categories />);

    const categories = ["general", "business", "technology", "sports", "entertainment"];
    categories.forEach((cat) => {
      expect(screen.getByText(cat)).toBeInTheDocument();
    });
  });

  it("updates category state when a button is clicked", () => {
    render(<Categories />);
    
    const businessButton = screen.getByText("business");
    fireEvent.click(businessButton);

    expect(mockSetCategory).toHaveBeenCalledWith("business");
  });

  it("navigates to the home page when a category is clicked", () => {
    render(<Categories />);
    
    const technologyButton = screen.getByText("technology");
    fireEvent.click(technologyButton);

    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
