import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Header/Header.component';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

describe('<Header />', () => {
  test('Header navigation elements are correct', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Header />
      </Router>
    );

    const toHome = screen.getByTestId('toHome');
    expect(toHome).toBeInTheDocument();

    fireEvent.click(toHome);

    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId('activeHomeIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('inactiveHomeIcon')).not.toBeInTheDocument();

    const toCharacters = screen.getByTestId('toCharacters');
    expect(toCharacters).toBeInTheDocument();

    fireEvent.click(toCharacters);

    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/characters');
    expect(screen.queryByTestId('activeHomeIcon')).not.toBeInTheDocument();
    expect(screen.getByTestId('inactiveHomeIcon')).toBeInTheDocument();
    expect(toCharacters).toHaveClass('active');

    const toAdd = screen.getByTestId('toAdd');
    expect(toAdd).toBeInTheDocument();

    fireEvent.click(toAdd);

    expect(history.length).toBe(3);
    expect(history.location.pathname).toBe('/add');
    expect(toCharacters).not.toHaveClass('active');
    expect(toAdd).toHaveClass('active');
  });
});
