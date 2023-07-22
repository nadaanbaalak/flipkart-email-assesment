import "./styles.css";

interface IFiltersProps {
  selectedFilter: string;
  filtersList: Array<{ slug: string; displayName: string }>;
  onFilterSelect(filterSlug: string): void;
}

const Filters = ({
  selectedFilter,
  filtersList,
  onFilterSelect,
}: IFiltersProps) => {
  return (
    <section className="filter-wrapper">
      <p>Filter By:</p>
      {filtersList.map((item) => (
        <div
          className={`filter-item ${
            selectedFilter === item.slug ? "selected-filter" : ""
          }`}
          key={item.slug}
          onClick={() => {
            onFilterSelect(item.slug);
          }}
        >
          {item.displayName}
        </div>
      ))}
    </section>
  );
};

export default Filters;
