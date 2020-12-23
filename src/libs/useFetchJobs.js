import { useReducer, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

function reducer(state, action) {
  switch (action.type) {
    case "make-request":
      return { loading: true, jobs: [] };
    case "get-data":
      return { ...state, loading: false, jobs: action.jobs };
    case "update-has-next-page":
      return { ...state, hasNextPage: action.hasNextPage };
    case "error":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}

function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source();
    dispatch({ type: "make-request" });
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((response) => {
        dispatch({ type: "get-data", jobs: response.data });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: "error", erorr: e });
      });

    const cancelToken2 = axios.CancelToken.source();
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((response) => {
        dispatch({
          type: "update-has-next-page",
          hasNextPage: response.data.length !== 0,
        });
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: "error", erorr: e });
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel();
    };
  }, [params, page]);

  return state;
}

export default useFetchJobs;
