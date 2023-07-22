import { useEffect } from "react";
import "./styles.css";

interface IFiltersProps {
  selectedFilter: string;
  filtersList: Array<{ slug: string; displayName: string }>;
}

const Filters = ({ selectedFilter, filtersList }: IFiltersProps) => {
  useEffect(() => {}, []);

  return (
    <section className="filter-wrapper">
      <p>Filter By:</p>
      {filtersList.map((item) => (
        <div
          className={selectedFilter === item.slug ? "selected-filter" : ""}
          key={item.slug}
        >
          {item.displayName}
        </div>
      ))}
    </section>
  );
};

export default Filters;
