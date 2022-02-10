// import { Grid, Button } from '@material-ui/core';
import { Grid } from '@mui/material';
// import BoardList from '../../components/Board/BoardList/';
import MyFarmBoardList from '../../../../components/Board/MyFarmBoardList/';
import { ViewContext } from '../../../../context/ViewContext';

const SurveyList = () => {
  return (
    <ViewContext.Provider>
      <Grid
        container
        direction="row"
        className="top-box"
        justifyContent="space-between"
        alignItems="end"
      ></Grid>
      {/* {searchValue && <div className="result">{searchValue} 검색 결과</div>} */}
      <MyFarmBoardList />
    </ViewContext.Provider>
  );
};

export default SurveyList;

// import * as React from 'react';
// import { Typography, Toolbar, Stack, Box } from '@mui/material';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// const SurveyList = () => {
//   return (
//     // <TableContainer component={Paper}>
//     //   <Toolbar>
//     //     <Typography variant="h6" id="tableTitle" component="div">
//     //       설문 내역
//     //     </Typography>
//     //   </Toolbar>
//     //   <TableContainer sx={12} aria-label="simple table">
//     //     <TableHead>
//     //       <TableRow>
//     //         <TableCell>Dessert (100g serving)</TableCell>
//     //         <TableCell align="right">Calories</TableCell>
//     //         <TableCell align="right">Fat&nbsp;(g)</TableCell>
//     //         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//     //         <TableCell align="right">Protein&nbsp;(g)</TableCell>
//     //       </TableRow>
//     //     </TableHead>
//     //     <TableBody>
//     //       {rows.map(row => (
//     //         <TableRow
//     //           key={row.name}
//     //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//     //         >
//     //           <TableCell component="th" scope="row">
//     //             {row.name}
//     //           </TableCell>
//     //           <TableCell align="right">{row.calories}</TableCell>
//     //           <TableCell align="right">{row.fat}</TableCell>
//     //           <TableCell align="right">{row.carbs}</TableCell>
//     //           <TableCell align="right">{row.protein}</TableCell>
//     //         </TableRow>
//     //       ))}
//     //     </TableBody>
//     //   </TableContainer>
//     // </TableContainer>
//     <>
//       <Toolbar>
//         <Typography variant="h6" id="tableTitle" component="div">
//           설문 내역
//         </Typography>
//       </Toolbar>
//       {rows.map(row => (
//         <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
//           <Box
//             component="img"
//             alt="title"
//             src="https://minimal-kit-react.vercel.app/static/mock-images/covers/cover_1.jpg"
//             sx={{ width: 48, height: 48, borderRadius: 1.5 }}
//           />
//           <Box sx={{ minWidth: 240 }}>
//             <Typography variant="subtitle2" noWrap>
//               {row.name}
//             </Typography>
//             <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
//               내용
//             </Typography>
//           </Box>
//           <Typography
//             variant="caption"
//             sx={{ pr: 3, flexShrink: 0, color: 'text.secondary' }}
//           >
//             캡션
//           </Typography>
//         </Stack>
//       ))}
//     </>
//   );
// };

// export default SurveyList;
