import React, { useEffect, useMemo, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import DataTable from 'react-data-table-component';

// Services
import { getAllRecords } from '@/services';

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
import { getDate, getError } from '@/helpers';

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
    (async () => {
      try {
        setLoading(true);
        const response = await getAllRecords();
        setData(response.data);
      } catch (e) {
        enqueueSnackbar({ variant: 'error', message: getError(e) });
      } finally {
        setLoading(false);
      }
    })();
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
