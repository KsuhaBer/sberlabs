import React, { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import useInfiniteScroll from './useInfiniteScroll';
import { useMediaQuery, Button, Box } from '@mui/material';
import './UserList.css';

const UserList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isMobile = useMediaQuery('(max-width: 768px)');
    
    const [columns, setColumns] = useState([
        {
            Header: 'ID',
            accessor: 'id',
            width: 150,
        },
        {
            Header: 'Имя пользователя',
            accessor: 'username',
            width: 250,
        },
        {
            Header: 'Роль',
            accessor: 'role',
            width: 200,
        },
        {
            Header: 'Пароль',
            accessor: 'password',
            Cell: ({ row }) => (
                row.original.role === 'user' ? row.original.password : '******'
            ),
            width: 200,
        },
        {
            Header: 'Статус',
            accessor: 'isBlocked',
            Cell: ({ value }) => (value ? 'Заблокирован' : 'Активен'),
            width: 150,
        },
        {
            Header: 'Действия',
            Cell: ({ row }) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button 
                        variant="contained" 
                        color={row.original.isBlocked ? 'success' : 'warning'}
                        size="small"
                        onClick={() => toggleBlockUser(row.original.username, row.original.isBlocked, row.original.id)}
                    >
                        {row.original.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                    </Button>
                    <Button 
                        variant="contained" 
                        color="error"
                        size="small"
                        onClick={() => deleteUser(row.original.username, row.original.id)}
                    >
                        Удалить
                    </Button>
                </div>
            ),
            width: 250,
        },
    ]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/users?page=${page}`);
            const newData = response.data;
    
            const uniqueData = newData.filter(newUser => 
                !data.some(existingUser => existingUser.id === newUser.id)
            );
    
            setData(prevData => [...prevData, ...uniqueData]);
            setHasMore(uniqueData.length > 0);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleBlockUser = async (username, isCurrentlyBlocked, userId) => {
        try {
            const endpoint = isCurrentlyBlocked
                ? `http://localhost:3001/users/unblock/${username}`
                : `http://localhost:3001/users/block/${username}`;
            
            await axios.put(endpoint);
            
            // Мгновенное обновление UI без запроса к серверу
            setData(prevData => prevData.map(user => 
                user.id === userId 
                    ? { ...user, isBlocked: !isCurrentlyBlocked } 
                    : user
            ));
        } catch (err) {
            console.error('Ошибка:', err);
            // В случае ошибки возвращаем предыдущее состояние
            setData(prevData => prevData.map(user => 
                user.id === userId 
                    ? { ...user, isBlocked: isCurrentlyBlocked } 
                    : user
            ));
        }
    };

    const deleteUser = async (username, userId) => {
        try {
            await axios.delete(`http://localhost:3001/users/${username}`);
            
            // Мгновенное удаление из UI
            setData(prevData => prevData.filter(user => user.id !== userId));
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    const handleDeleteAllUsers = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить ВСЕХ пользователей с ролью "user"?')) {
            return;
        }
        
        try {
            const usersToDelete = data.filter(user => user.role === 'user');
            const deletePromises = usersToDelete.map(user => 
                axios.delete(`http://localhost:3001/users/${user.username}`)
            );
            
            await Promise.all(deletePromises);
            // Мгновенное обновление UI
            setData(prevData => prevData.filter(user => user.role !== 'user'));
        } catch (err) {
            console.error('Ошибка при массовом удалении:', err);
        }
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const newColumns = Array.from(columns);
        const [movedColumn] = newColumns.splice(result.source.index, 1);
        newColumns.splice(result.destination.index, 0, movedColumn);
        setColumns(newColumns);
    };

    useEffect(() => {
        fetchUsers();
    }, [page]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    const loaderRef = useInfiniteScroll(() => setPage(prev => prev + 1), hasMore, loading);

    return (
        <div style={{ padding: '20px', position: 'relative' }}>
            <Box sx={{ 
                position: 'absolute', 
                right: 20, 
                top: 20,
                zIndex: 1000
            }}>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={handleDeleteAllUsers}
                    sx={{
                        backgroundColor: '#f44336',
                        '&:hover': { backgroundColor: '#d32f2f' },
                        fontWeight: 'bold'
                    }}
                >
                    Удалить всех users
                </Button>
            </Box>

            {loading && page === 1 && <div>Загрузка данных...</div>}
            {error && <div style={{ color: 'red' }}>Ошибка загрузки: {error}</div>}
            
            {!loading && !error && (
                <>
                    <h1>Список пользователей</h1>
                    
                    {isMobile ? (
                        <div style={{ overflowY: 'auto', maxHeight: '500px' }}>
                            {data.map(user => (
                                <div key={user.id} style={{
                                    border: '1px solid #ddd',
                                    marginBottom: '10px',
                                    padding: '10px',
                                    borderRadius: '4px'
                                }}>
                                    <div><strong>Имя пользователя:</strong> {user.username}</div>
                                    <div><strong>Роль:</strong> {user.role}</div>
                                    <div><strong>Пароль:</strong> {user.role === 'user' ? user.password : '******'}</div>
                                    <div><strong>Статус:</strong> {user.isBlocked ? 'Заблокирован' : 'Активен'}</div>
                                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                                        <Button 
                                            variant="contained" 
                                            color={user.isBlocked ? 'success' : 'warning'}
                                            size="small"
                                            onClick={() => toggleBlockUser(user.username, user.isBlocked, user.id)}
                                        >
                                            {user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="error"
                                            size="small"
                                            onClick={() => deleteUser(user.username, user.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <div ref={loaderRef} style={{ height: '20px', marginTop: '20px' }}>
                                {loading && <span>Загрузка...</span>}
                            </div>
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={onDragEnd}>
                            <div style={{ height: '400px', overflowY: 'auto' }}>
                                <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <Droppable droppableId="headers" direction="horizontal">
                                        {(provided) => (
                                            <thead ref={provided.innerRef} {...provided.droppableProps}>
                                                <tr>
                                                    {headerGroups[0].headers.map((column, index) => (
                                                        <Draggable key={column.id} draggableId={column.id} index={index}>
                                                            {(provided) => (
                                                                <th
                                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                        padding: '10px',
                                                                        border: '1px solid lightgray',
                                                                        backgroundColor: 'white',
                                                                        cursor: 'pointer',
                                                                        width: column.width,
                                                                    }}
                                                                >
                                                                    {column.render('Header')}
                                                                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                                </th>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </tr>
                                            </thead>
                                        )}
                                    </Droppable>
                                    <tbody {...getTableBodyProps()}>
                                        {rows.map(row => {
                                            prepareRow(row);
                                            return (
                                                <tr {...row.getRowProps()} style={{ border: '1px solid lightgray' }}>
                                                    {row.cells.map(cell => (
                                                        <td {...cell.getCellProps()} style={{ padding: '10px', border: '1px solid lightgray' }}>
                                                            {cell.render('Cell')}
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div ref={loaderRef} style={{ height: '20px', marginTop: '20px' }}>
                                {loading && <span>Загрузка...</span>}
                            </div>
                        </DragDropContext>
                    )}
                </>
            )}
        </div>
    );
};

export default UserList;