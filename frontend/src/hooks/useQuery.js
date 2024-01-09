import { useMemo } from 'react'
//import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom"

export function useQuery() {

  const { search } = useLocation()

  return useMemo(
      () => new URLSearchParams(search),
      [search]
  );
}

useQuery.propTypes = {}

export default useQuery