import React, { useState } from "react";
import { Container } from "react-bootstrap";
import useFetchJobs from "./libs/useFetchJobs";
import Job from "./components/Job";
import JobsPagination from "./components/JobsPagination";
import SearchForm from "./components/SearchForm";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamsChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      [param]: value,
    }));
  };

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamsChange} />
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error...</h1>}
      <h1>
        {jobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </h1>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
