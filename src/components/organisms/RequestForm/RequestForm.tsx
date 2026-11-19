import { useState, useTransition, type FC, type FormEvent } from 'react';

import type { Balance, LeaveType, NewTimeOffRequest } from '../../../types/timeOff';
import { formatLongDate } from '../../../utils/dates';
import { Button, DateField, InfoBanner, PageTitle, TextArea } from '../../atoms';
import { DatePicker, TypeSelector } from '../../molecules';

import styles from './RequestForm.module.scss';
import { EMPTY_DRAFT, getHint, getSummary, toNewRequest, type Draft } from './RequestForm.utils';

type RequestFormProps = {
  balances: Record<LeaveType, Balance>;
  onSubmit: (request: NewTimeOffRequest) => Promise<void>;
  onClose: () => void;
};

const RequestForm: FC<RequestFormProps> = ({ balances, onSubmit, onClose }) => {
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [submitting, startSubmit] = useTransition();

  const change = (patch: Partial<Draft>) => setDraft((prev) => ({ ...prev, ...patch }));
  const balance = balances[draft.leaveType];
  const request = toNewRequest(draft);
  const canSubmit = !!request && request.days > 0 && !submitting;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    startSubmit(async () => {
      await onSubmit(request);
      onClose();
    });
  };

  return (
    <form aria-labelledby="request-form-title" className={styles.form} onSubmit={submit}>
      <PageTitle id="request-form-title" level={2} title="New time off request" />

      <TypeSelector value={draft.leaveType} hint={getHint(balance)} onChange={(leaveType) => change({ leaveType })} />

      <div className={styles.pair}>
        <DateField label="Start date" value={draft.start && formatLongDate(draft.start)} />
        <DateField label="End date" value={draft.end && formatLongDate(draft.end)} />
      </div>

      <DatePicker start={draft.start} end={draft.end} onChange={change} />

      {request && <InfoBanner {...getSummary(balance, request.days)} />}

      <TextArea
        label="Note for your manager"
        value={draft.note}
        rows={2}
        placeholder="e.g. Ondřej covers my tickets that week"
        onChange={(note) => change({ note })}
      />

      <div className={styles.pair}>
        <Button label="Cancel" variant="secondary" full disabled={submitting} onClick={onClose} />
        <Button label={submitting ? 'Sending…' : 'Submit request'} type="submit" full disabled={!canSubmit} />
      </div>
    </form>
  );
};

export default RequestForm;
