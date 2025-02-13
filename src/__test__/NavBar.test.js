import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "@/components/NavBar";  // Update the import path if needed
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("NavBar Component", () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    useRouter.mockReturnValue(mockRouter);
  });

  it("renders navigation links", () => {
    render(<NavBar />);
    
    
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  it("navigates to a new page when a link is clicked", async () => {
    render(<NavBar />);
    const user = userEvent.setup();

  
    const aboutLink = screen.getByText(/About/i);
    await user.click(aboutLink);

    
    expect(mockRouter.push).toHaveBeenCalledWith("/about");
  });

  it("matches the snapshot", () => {
    const { asFragment } = render(<NavBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
