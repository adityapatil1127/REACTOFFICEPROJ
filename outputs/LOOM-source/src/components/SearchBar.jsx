import { useEffect, useRef, useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function submit(event) {
    event.preventDefault();
    onSearch(value.trim());
    setOpen(false);
  }

  return <>
    {open && <button className="search-backdrop" type="button" aria-label="Close search" onClick={() => setOpen(false)} />}
    <form className={`search-form ${open ? 'is-open' : ''}`} onSubmit={submit}>
      {open && <input ref={inputRef} value={value} onChange={(event) => setValue(event.target.value)} placeholder="Search the collection" aria-label="Search products" />}
      <button type={open ? 'submit' : 'button'} className="header-icon search-toggle" aria-label={open ? 'Search' : 'Open search'} onClick={() => { if (!open) setOpen(true); }}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.7" /><path d="m16 16 4.1 4.1" /></svg></button>
    </form>
  </>;
}
