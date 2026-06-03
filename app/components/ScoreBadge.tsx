interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeColor = '';
  let badgeText = '';

  if (score > 70) {
    badgeColor = 'bg-badge-green text-badge-green-text';
    badgeText = 'Strong';
  } else if (score > 49) {
    badgeColor = 'bg-badge-yellow text-badge-yellow-text';
    badgeText = 'Good';
  } else {
    badgeColor = 'bg-badge-red text-badge-red-text';
    badgeText = 'Needs Work';
  }

  return (
    <div className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${badgeColor}`}>
      {badgeText}
    </div>
  );
};

export default ScoreBadge;
