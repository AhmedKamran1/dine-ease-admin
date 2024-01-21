import React, { useEffect, useMemo, useState } from 'react';

import DataTable from 'react-data-table-component';

// Styles
import { DashboardContent, FlexContainer, InputField } from '@/components/UI';
import { InputAdornment } from '@mui/material';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Search from '@mui/icons-material/Search';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LoopIcon from '@mui/icons-material/Loop';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';

// Helpers
import { getDate } from '@/helpers';

const logsData = [
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-12-28T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-06T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-12-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-11-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-10-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-09-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'pending',
    createdAt: '2023-08-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-07-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-06-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-05-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-04-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-03-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-02-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-12-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-11-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-10-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-09-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-08-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'pending',
    createdAt: '2023-07-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-06-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-05-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-04-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-03-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'listing',
    status: 'approved',
    createdAt: '2023-02-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
  {
    adminId: '655c9411a62e7977c601cf3e',
    restaurantId: '658da7c2f9dca6b460be688c',
    type: 'modification',
    status: 'rejected',
    createdAt: '2023-01-04T17:16:59.958+00:00',
  },
];
const LogsTable = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterText, setFilterText] = useState('');

  const filteredReviews = data?.filter(
    (item) =>
      item.adminId.toLowerCase().includes(filterText.toLowerCase()) ||
      item.restaurantId.toLowerCase().includes(filterText.toLowerCase()) ||
      item.type.toLowerCase().includes(filterText.toLowerCase()) ||
      item.status.toLowerCase().includes(filterText) ||
      getDate(item.createdAt).toLowerCase().includes(filterText)
  );

  useEffect(() => {
    setLoading(true);
    setData(logsData);
    setLoading(false);
  }, []);

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <InputField
        name="search"
        label="Search"
        variant="outlined"
        placeholder="Search Reviews"
        onChange={(event) => setFilterText(event.target.value)}
        value={filterText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: '300px' }}
      />
    );
  }, [filterText]);

  const columns = [
    {
      name: (
        <FlexContainer gap={0.5}>
          <VerifiedUserIcon color="primary" />
          Admin ID
        </FlexContainer>
      ),
      selector: (row) => row.adminId,
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <BadgeIcon color="primary" />
          Restaurant ID
        </FlexContainer>
      ),
      selector: (row) => row.restaurantId,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <QuestionAnswerIcon color="primary" />
          Request Type
        </FlexContainer>
      ),
      selector: (row) => row.type,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <LoopIcon color="primary" />
          Status
        </FlexContainer>
      ),
      selector: (row) => row.status,
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CalendarMonthIcon color="primary" />
          Date
        </FlexContainer>
      ),
      selector: (row) => getDate(row.createdAt),
      center: 'true',
    },
  ];

  return (
    <DashboardContent>
      <DataTable
        columns={columns}
        data={filteredReviews}
        responsive
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15]}
        progressPending={loading}
      />
    </DashboardContent>
  );
};

export default LogsTable;
