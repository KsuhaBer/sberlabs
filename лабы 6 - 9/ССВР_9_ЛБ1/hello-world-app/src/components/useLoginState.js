import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import axios from 'axios';
import { Button, Box } from '@mui/material';

const UserList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            setData(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3001/users/${userId}`);
            setData(data.filter(user => user.id !== userId));
        } catch (err) {
            console.error('Ошибка при удалении:', err);
        }
    };

    const handleBlock = async (userId, isCurrentlyBlocked) => {
        try {
            await axios.patch(`http://localhost:3001/users/${userId}`, {
                isBlocked: !isCurrentlyBlocked
            });
            setData(data.map(user => 
                user.id === userId ? { ...user, isBlocked: !isCurrentlyBlocked } : user
            ));
        } catch (err) {
            console.error('Ошибка при блокировке:', err);
        }
    };

    const handleDeleteAllUsers = async () => {
        if (!window.confirm('Вы уверены, что хотите удалить ВСЕХ пользователей с ролью "user"?')) {
            return;
        }
        
        try {
            // Получаем всех пользователей с ролью "user"
            const usersToDelete = data.filter(user => user.role === 'user');
            
            // Создаем массив промисов для удаления
            const deletePromises = usersToDelete.map(user => 
                axios.delete(`http://localhost:3001/users/${user.id}`)
            );
            
            // Выполняем все запросы на удаление
            await Promise.all(deletePromises);
            
            // Обновляем состояние, оставляя только пользователей с другими ролями
            setData(data.filter(user => user.role !== 'user'));
        } catch (err) {
            console.error('Ошибка при массовом удалении:', err);
        }
    };

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'Имя пользователя',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Роль',
                accessor: 'role',
            },
            {
                Header: 'Заблокирован',
                accessor: 'isBlocked',
                Cell: ({ cell: { value } }) => (value ? 'Да' : 'Нет'),
            },
            {
                Header: 'Действия',
                Cell: ({ row }) => (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <Button 
                            variant="contained" 
                            color="error"
                            size="small"
                            onClick={() => handleDelete(row.original.id)}
                        >
                            Удалить
                        </Button>
                        <Button 
                            variant="contained" 
                            color="warning"
                            size="small"
                            onClick={() => handleBlock(row.original.id, row.original.isBlocked)}
                        >
                            {row.original.isBlocked ? 'Разблокировать' : 'Заблокировать'}
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;

    return (
        <div style={{ padding: '20px', position: 'relative' }}>
            <Box sx={{ 
                position: 'absolute', 
                right: 20, 
                top: 20,
                display: 'flex',
                gap: '10px'
            }}>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={handleDeleteAllUsers}
                    sx={{
                        backgroundColor: '#f44336',
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                        }
                    }}
                >
                    Удалить всех users
                </Button>
            </Box>

            <h2>Список пользователей</h2>
            <table {...getTableProps()} style={{ 
                border: 'solid 1px #ddd',
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px'
            }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} style={{ 
                                    border: 'solid 1px #ddd',
                                    padding: '10px',
                                    background: '#f5f5f5',
                                    textAlign: 'left'
                                }}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} style={{ 
                                        border: 'solid 1px #ddd',
                                        padding: '10px'
                                    }}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;