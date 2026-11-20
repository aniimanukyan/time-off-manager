import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import SessionProvider from '../../state/SessionProvider';
import TimeOffProvider from '../../state/TimeOffProvider';
import { expectTexts } from '../../testUtils/expectTexts';

import Employee from './Employee';

const renderEmployee = () =>
  render(
    <SessionProvider>
      <TimeOffProvider>
        <Employee />
      </TimeOffProvider>
    </SessionProvider>,
  );

describe('Employee view', () => {
  beforeEach(() => {
    renderEmployee();
  });

  it('shows the list of upcoming time offs', async () => {
    const list = await screen.findByRole('list', { name: 'Upcoming requests' });
    const rows = within(list).getAllByRole('listitem');

    expect(rows).toHaveLength(2);
    expectTexts(rows[0], ['Vacation', '21 – 30 Dec · 8 days', 'Pending']);
    expectTexts(rows[1], ['Personal day', 'Fri 4 Dec · 1 day', 'Approved']);
  });

  it('requests new time off and shows it at the top of upcoming requests', async () => {
    const list = await screen.findByRole('list', { name: 'Upcoming requests' });

    fireEvent.click(screen.getByLabelText('New time off request', { selector: 'ion-fab-button' }));
    const form = await screen.findByRole('form', { name: 'New time off request' });

    const calendar = form.querySelector('ion-datetime') as HTMLIonDatetimeElement;
    fireEvent(calendar, new CustomEvent('ionChange', { detail: { value: '2026-12-14' } }));
    fireEvent(calendar, new CustomEvent('ionChange', { detail: { value: '2026-12-18' } }));

    expectTexts(form, ['Mon 14 Dec 2026', 'Fri 18 Dec 2026', '5 working days']);

    fireEvent.click(within(form).getByText('Submit request'));

    await waitFor(() => expect(within(list).getAllByRole('listitem')).toHaveLength(3));
    const [created] = within(list).getAllByRole('listitem');
    expectTexts(created, ['Vacation', '14 – 18 Dec · 5 days', 'Pending']);
    await waitFor(() => expect(screen.queryByRole('form', { name: 'New time off request' })).not.toBeInTheDocument());
  });
});
