import React, { useState, useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { withStyles, Theme } from "@material-ui/core/styles";
import Header from "../../components/header/NavHeader";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import { Container, Grid, Button, Hidden } from "@material-ui/core";
import Footer from "../../components/footer/Footer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { format } from "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { DateRangePicker, DateRange } from "materialui-daterange-picker";
import Drawer from "@material-ui/core/Drawer";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  getUserActivitiesAsync,
  filterActivitiesAsync,
  selectStateValues,
} from "../../app/activity-redux/activitySlice";
import { selectStateValues as selectUserValues } from "../../app/auth-redux/authSlice";
import { CSVLink } from "react-csv";

export default function ActivityHistory() {
  const dispatch = useAppDispatch();
  const { activities } = useAppSelector(selectStateValues);
  const [rowData, setRowData] = useState<[object?]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({});
  const [csvReport, setCsvReport] = useState({
    data: [],
    filename: "Report.csv",
  });
  const { userData } = useAppSelector(selectUserValues);
  const toggle = () => setOpen(!open);
  const classes = useStyles();

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage);

  const checkDatePickerValue = () => {
    if (dateRange.startDate && dateRange.endDate) return true;
    return false;
  };

  const handleDatePicker = () => {
    return `${format(
      new Date(dateRange.startDate || ""),
      "dd-MMM-yy"
    )} to  ${format(new Date(dateRange.endDate || ""), "dd-MMM-yy")}`;
  };

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const getUserActivities = async () => {
    const result = await dispatch(getUserActivitiesAsync());
    return result;
  };

  const groupActivitiesByDate = (data: [object?]) => {
    let grouped: [object?] = [];
    let result = data.reduce((r: any, a: any) => {
      let day = new Date(a.createdAt).toDateString();
      r[day] = r[day] || [];
      r[day].push(a);
      return r;
    }, Object.create(null));
    for (const key in result) {
      let object: any = { date: new Date(key) };
      let clockedIn = result[key].find((x: any) => x.clockedIn === true);
      let clockedOut = result[key].find((x: any) => x.clockedOut === true);
      clockedIn && (object.clockedIn = clockedIn.createdAt);
      clockedOut && (object.clockedOut = clockedOut.createdAt);
      grouped.push(object);
    }
    return grouped;
  };

  const sortActivitiesByDate = (data: [object?]) => {
    return data.sort((a: any, b: any) => b.date - a.date);
  };

  const handleFilter = () => {
    let dateRange: DateRange = { startDate, endDate };
    setDateRange(dateRange);
    setOpenDrawer(false);
  };

  const getExportFileName = () => {
    return `Reports-${
      userData && userData.firstname + " " + userData.lastname
    }-${new Date().toDateString()}-export.csv`;
  };

  const downloadReport = (event: any, done: (arg: any) => void) => {
    let exportData = rowData.map((e: any) => {
      let obj: any = {};
      obj.Day = format(new Date(e.date), "EEEE");
      obj.Date = format(new Date(e.date), "dd-MMM-yyyy");
      obj.ClockedIn = e.clockedIn && format(new Date(e.clockedIn), "hh:mm aa");
      obj.ClockedOut =
        e.clockedOut && format(new Date(e.clockedOut), "hh:mm aa");
      return obj;
    });
    const objReport = { filename: getExportFileName(), data: exportData };
    setCsvReport(objReport as any);
    done(true);
  };

  useEffect(() => {
    async function fetchActivities() {
      await getUserActivities();
    }
    fetchActivities();
  }, []);

  useEffect(() => {
    async function filter() {
      if (dateRange.startDate) await dispatch(filterActivitiesAsync(dateRange));
    }
    filter();
    return () => {};
  }, [dateRange]);

  useEffect(() => {
    let data = sortActivitiesByDate(groupActivitiesByDate(activities));
    setRowData(data);
    return () => {};
  }, [activities]);

  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Container style={{ margin: "30px auto" }}>
          <Grid
            container
            spacing={5}
            direction="row"
            justify="space-between"
            style={{ marginBottom: "10px" }}
          >
            <Grid item container alignItems="flex-end" xs={6} md={3}>
              <Hidden smUp={true}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  color="secondary"
                  onClick={() => setOpenDrawer(true)}
                >
                  Filter
                </Button>
              </Hidden>

              <Hidden xsDown={true}>
                <Box width={1}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={() => toggle()}
                    value={
                      checkDatePickerValue()
                        ? handleDatePicker()
                        : "Select  Date Range"
                    }
                  />
                  <DateRangePicker
                    open={open}
                    toggle={toggle}
                    wrapperClassName={classes.datePickerWrapper}
                    onChange={(range) => setDateRange(range)}
                  />
                </Box>
              </Hidden>
            </Grid>
            <Grid item container alignItems="flex-end" xs={6} md={3}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
              >
                <CSVLink
                  {...csvReport}
                  asyncOnClick={true}
                  onClick={downloadReport}
                  className="MuiButton-containedPrimary MuiButtonBase-root"
                >
                  Export CSV
                </CSVLink>
              </Button>
            </Grid>
          </Grid>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Day</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                  <StyledTableCell align="right">Clock In</StyledTableCell>
                  <StyledTableCell align="right">Clock Out</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rowData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rowData
                ).map((row: any, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {format(new Date(row.date), "EEEE")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {format(new Date(row.date), "dd-MMM-yyyy")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.clockedIn &&
                        format(new Date(row.clockedIn), "hh:mm aa")}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.clockedOut &&
                        format(new Date(row.clockedOut), "hh:mm aa")}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rowData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Container>
      </main>
      <Footer />
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{
          paper: classes.drawer,
        }}
      >
        <Box>
          <Grid
            container
            spacing={5}
            direction="row"
            justify="space-between"
            style={{ marginBottom: "10px", padding: "3em 1em" }}
          >
            <Grid item container alignItems="flex-end" xs={12} md={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Start Date"
                  format="MM/dd/yyyy"
                  value={startDate}
                  required
                  onChange={(date) => setStartDate(date as Date | undefined)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item container alignItems="flex-end" xs={12} md={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  label="End date"
                  format="MM/dd/yyyy"
                  value={endDate}
                  onChange={(date) => setEndDate(date as Date | undefined)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item container alignItems="flex-start" xs={12} md={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                onClick={() => handleFilter()}
              >
                Filter
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
}

const StyledTableCell = withStyles((theme: Theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(even)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const useStyles = makeStyles({
  table: {},
  datePickerWrapper: {
    position: "absolute",
  },
  drawer: {
    width: "70vw",
  },
});
