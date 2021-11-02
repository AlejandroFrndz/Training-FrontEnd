import React from 'react';
import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n/i18n';
import Home, { Props } from '../../../components/Home/Home.component';

let props: Props;

const customRender = (props: Props) => {
  render(
    <I18nextProvider i18n={i18n}>
      <Home {...props} />
    </I18nextProvider>
  );
};

describe('<Home />', () => {
  beforeEach(() => {
    props = {
      character: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Dead',
        species: 'Human',
        type: '',
        gender: 'Male',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      }
    };
  });

  test('All elements are displayed', () => {
    customRender(props);

    expect(
      screen.getByText("Today's immortal character is")
    ).toBeInTheDocument();
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByAltText("Rick Sanchez's face")).toBeInTheDocument();
    expect(
      screen.getByText('Remember, the immortal character cannot be vaporized')
    );
  });

  test('If character is undefined, it displays appropiate message', () => {
    props.character = undefined;

    customRender(props);

    expect(screen.queryByText('Rick Sanchez')).not.toBeInTheDocument();
    expect(screen.getByText('No one is immortal today')).toBeInTheDocument();
  });
});
