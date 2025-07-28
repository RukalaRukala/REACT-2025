import { useEffect, useState } from 'react';
import { searchPetsByStatus } from '../../Search/Search.api';
import { DETAILS_MESSAGES } from './Details.const';
import type { Pet } from '../../Search/Search.model.tsx';

function Details({ id, onClose }: { id: string; onClose: () => void }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPet(null);
    Promise.all([
      searchPetsByStatus('available'),
      searchPetsByStatus('pending'),
      searchPetsByStatus('sold'),
    ])
      .then((results) => {
        const all = ([] as Pet[]).concat(...results);
        const found = all.find((p: Pet) => String(p.id) === String(id));
        if (found) {
          setPet(found);
        } else {
          setError(DETAILS_MESSAGES.NOT_FOUND);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(DETAILS_MESSAGES.ERROR);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>{DETAILS_MESSAGES.LOADING}</div>;
  if (error) return <div>{error}</div>;
  if (!pet) return null;

  return (
    <div>
      <button onClick={onClose}>{DETAILS_MESSAGES.CLOSE}</button>
      <h2>{DETAILS_MESSAGES.TITLE}</h2>
      <div>
        {DETAILS_MESSAGES.ID}: {pet.id}
      </div>
      <div>
        {DETAILS_MESSAGES.NAME}: {pet.name}
      </div>
      <div>
        {DETAILS_MESSAGES.STATUS}: {pet.status}
      </div>
      <div>
        {DETAILS_MESSAGES.CATEGORY}: {pet.category && pet.category.name}
      </div>
    </div>
  );
}

export default Details;
