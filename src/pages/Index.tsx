import MultipleTables from '@/components/DataTable/index';
import { useGetCall } from '@/hooks';
import { title } from 'process';
import { useEffect, useState } from 'react';
const Index = () => {
    const Columns: any = [
        {
            title: 'Record Type',
            key: 'name',
            sortable: true,
        },
        {
            title: 'Amount',
            key: 'address',
            render: (row: any) => <span>{row.name}</span>,
            sortable: true,
        },
    ];

    const data: any = [
        { name: 'Prasad', age: 28, address: 'some where', key: '1' },
        { name: 'Prasath', age: 36, address: 'some where', key: '2' },
    ];

    return (
        <div>
            <h1>starter page</h1>
            <div className="panel mt-6">
                {/* <button onClick={() => setFilter((prv) => ({ ...prv, endDate: '2024-05-02' }))}>Click Me</button> */}
                <MultipleTables
                    columns={Columns}
                    data={data}
                    pageSize={2}
                    currentPage={1}
                    totalRecords={data?.pageInfo?.recordsTotal ?? 0}
                />
            </div>
        </div>
    );
};

export default Index;
