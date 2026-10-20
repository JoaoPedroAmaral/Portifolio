export const PROJECT_STATUS = {
  active: 'active',
  evolving: 'evolving',
  maintenance: 'maintenance',
  archived: 'archived',
}

export const STATUS_PRESENTATION = {
  [PROJECT_STATUS.active]: {
    containerClassName: 'border-accent/40 bg-accent-wash text-accent',
    dotClassName: 'bg-accent',
  },
  [PROJECT_STATUS.evolving]: {
    containerClassName: 'border-accent/30 text-accent',
    dotClassName: 'bg-accent',
  },
  [PROJECT_STATUS.maintenance]: {
    containerClassName: 'border-line-strong text-ink-muted',
    dotClassName: 'bg-ink-muted',
  },
  [PROJECT_STATUS.archived]: {
    containerClassName: 'border-line text-ink-muted',
    dotClassName: 'bg-line-strong',
  },
}
