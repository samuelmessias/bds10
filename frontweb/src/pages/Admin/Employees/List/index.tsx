import './styles.css';

import Pagination from 'components/Pagination';
import EmployeeCard from 'components/EmployeeCard';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { requestBackend } from 'util/requests';
import { Employee } from 'types/employee';
import { SpringPage } from 'types/vendor/spring';
import { hasAnyRoles } from 'util/auth';

const employeeHardCode = { // delete
  id: 1,
  name: "Carlos",
  email: "carlos@gmail.com",
  department: {
    id: 1,
    name: "Sales"
  }
};

const List = () => {
  const [page, setPage] = useState<SpringPage<Employee>>();

  const handlePageChange = (pageNumber: number) => {
    // to do
  };



  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/employees',
      params: {
        page: 0,
        size: 4,
      },
      withCredentials: true,
    };


    requestBackend(params)
      .then((response) => {
        setPage(response.data)
        console.log(response.data.content);
      })

  }, []);





  return (
    <>
    {hasAnyRoles(['ROLE_ADMIN']) && (
      <Link to="/admin/employees/create">
        <button className="btn btn-primary text-white btn-crud-add">
          ADICIONAR
        </button>
      </Link>
       )}
      <div className="row">
        {page?.content.map((employee) => (
          <div key={employee.id} className="col-sm-6 col-md-12">
            <EmployeeCard employee={employee} />
          </div>
        ))}
      </div>


      <Pagination
        forcePage={0}
        pageCount={1}
        range={3}
        onChange={handlePageChange}
      />
    </>
  );
};

export default List;
