import React, { useMemo, useState } from 'react';

// Styles

import { DashboardContent, FlexContainer, InputField, Text } from '@/components/UI';
import { InputAdornment } from '@mui/material';

// Icons
import Search from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BadgeIcon from '@mui/icons-material/Badge';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import CallIcon from '@mui/icons-material/Call';

// Component
import DataTable from 'react-data-table-component';

const RestaurantsTable = ({ restaurants }) => {
  const [filterText, setFilterText] = useState('');

  const filteredData = restaurants?.filter(
    (item) =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) ||
      item.id.toLowerCase().includes(filterText.toLowerCase()) ||
      item.taxId.toLowerCase().includes(filterText.toLowerCase()) ||
      item?.phoneNumber?.toString().includes(filterText)
  );

  const subHeaderComponentMemo = useMemo(() => {
    return (
      <InputField
        name="search"
        label="Search"
        variant="outlined"
        placeholder="Search"
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
          <RestaurantIcon color="primary" />
          Restaurant Name
        </FlexContainer>
      ),
      selector: (row) => row.name,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <BadgeIcon color="primary" />
          Restaurant ID
        </FlexContainer>
      ),
      selector: (row) => row.id,
      sortable: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <FactCheckIcon color="primary" />
          Tax ID
        </FlexContainer>
      ),
      selector: (row) => row.taxId,
      sortable: 'true',
      center: 'true',
    },
    {
      name: (
        <FlexContainer gap={0.5}>
          <CallIcon color="primary" />
          Contact No.
        </FlexContainer>
      ),
      selector: (row) => row.phoneNumber,
      center: 'true',
    },
  ];

  return (
    <DashboardContent>
      <DataTable
        columns={columns}
        data={filteredData}
        responsive
        title="Registered Restaurants"
        fixedHeader={true}
        // subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        pagination
        paginationPerPage={6}
        paginationRowsPerPageOptions={[6]}
      />
    </DashboardContent>
  );
};

export default RestaurantsTable;
