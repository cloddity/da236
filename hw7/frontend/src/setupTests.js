import '@testing-library/jest-dom';
// Mock axios globally to avoid import issues in Jest
jest.mock('axios');

// Mock react-router-dom's useNavigate to prevent navigation errors in tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));