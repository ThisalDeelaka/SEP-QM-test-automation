import { ScrollArea } from "@/components/ui/scroll-area";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { BiX } from "react-icons/bi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//view pop-up import from shudcn
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const currentDate = new Date();

  // Calculate the difference in years
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  // Adjust age if the current date is before the birth month and day
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

const ReportCard = () => {
  const patId = Cookies.get("roleId"); // get the patient id from the
  const [reportData, setReportData] = useState(null);
  // const [patientDetails, setPatientDetails] = useState({}); // to store patient details

  const [medicalReports, setMedicalReports] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [startDate, setStartDate] = useState(""); // State variable for start date
  const [endDate, setEndDate] = useState(""); // State variable for end date
  const [filteredReports, setFilteredReports] = useState(null); // State variable for filtered reports

  useEffect(() => {
    // Fetch data from backend API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/dailyupdate/${Cookies.get("roleId")}`
        );
        setReportData(response.data.dailyUpdates);
        console.log(response.data);
        console.log(reportData);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter reports based on search query and date range
  useEffect(() => {
    if (reportData) {
      let filtered = reportData.filter((report) =>
        report.reportName.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (startDate && endDate) {
        filtered = filtered.filter((report) => {
          const reportDate = new Date(report.date);
          return (
            reportDate >= new Date(startDate) && reportDate <= new Date(endDate)
          );
        });
      }

      setFilteredReports(filtered);
    }
  }, [reportData, searchQuery, startDate, endDate]);

  const handleDelete = async (reportId) => {
    try {
      // Send a DELETE request to the backend API
      await axios.delete(
        `http://localhost:5000/api/v1/dailyupdate/${reportId}`
      );

      // Optionally, update the state or perform any necessary actions after deletion
      console.log(`Report with ID ${reportId} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete report:", error);
    }
  };

  useEffect(() => {
    // Fetch medical reports from backend API
    const fetchMedicalReports = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/report/patient/${patId}`
        );
        setMedicalReports(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical reports:", error);
      }
    };

    fetchMedicalReports();
  }, [patId]); // Fetch reports when patient ID changes

  return (
    <div>
      <h2 className="m-4 text-2xl font-bold">My Records</h2>
      <Tabs defaultValue="dailyupload">
        <TabsList className="flex p-4 mx-6">
          <TabsTrigger value="dailyupload">Daily Uploads</TabsTrigger>
          <TabsTrigger value="report">Medical Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="dailyupload">
          {/* Search box */}
          <div className="flex justify-start gap-4 ml-6">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex p-2 mb-4 border rounded-md"
            />
            {/* Date range filter */}
            <div className="flex justify-start mb-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 mr-2 border rounded-md"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>
          </div>

          <ScrollArea className="p-4 mx-20 border rounded-xl h-[450px]">
            {/* Check if data has been fetched */}

            {filteredReports && Array.isArray(filteredReports) ? (
              filteredReports.map((report) => {
                // Assuming report.date is a string in ISO 8601 format like "2024-03-30T08:00:00.000Z"
                const dateObj = new Date(report.date);

                // Extract date components
                const year = dateObj.getFullYear();
                const month = dateObj.getMonth() + 1; // Months are 0-indexed
                const date = dateObj.getDate();

                // Extract time components
                const hours = dateObj.getHours();
                const minutes = dateObj.getMinutes();
                const seconds = dateObj.getSeconds();

                // Format the date and time strings
                const formattedDate = `${year}-${month}-${date}`;
                const formattedTime = `${hours}:${minutes}:${seconds}`;

                return (
                  <div key={report._id}>
                    {/* report Card 1 */}
                    <div className="mb-4 px-6 py-4 border border-[#089BAB] rounded-2xl">
                      <div className="flex justify-between">
                        <h2 className="mb-2 text-xl font-bold ">
                          {report.reportName}
                        </h2>
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <div className=" text-[#089BAB] text-m">Date</div>
                          <div className="font-normal text-md text-slate-800 ">
                            {formattedDate}
                          </div>
                          <div className=" text-[#089BAB] text-m">Time</div>
                          <div className="font-normal text-md text-slate-800 ">
                            {formattedTime}
                          </div>
                        </div>
                        <div className="w-[400px] text-center desktop-view-only">
                          <h2 className="text-xl font-medium ">Summery</h2>
                          <div className=" text-[#089BAB] text-m">
                            Temperature :
                            <span className="text-black">
                              {report.temperature}
                            </span>
                          </div>
                          <div className=" text-[#089BAB] text-m">
                            Syptomps :
                            <span className="text-black">
                              {report.symptoms + " "}
                            </span>
                          </div>
                          <div className=" text-[#089BAB] text-m">
                            Medication :
                            {report.medications.map((medication) => (
                              <div key={medication.index}>
                                <span className="text-black">
                                  {medication.type + " - "}
                                </span>
                                <span className="text-black">
                                  {medication.messure + " "}
                                </span>{" "}
                                {/* //this measure is not defined in the report schema */}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <Dialog>
                            <DialogTrigger className="px-4 py-2 mb-2 text-[#089BAB] border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white">
                              View
                            </DialogTrigger>
                            <DialogContent className="w-[50vw]">
                              <div className="popup">
                                <div className="popup-content">
                                  <div className="">
                                    <h2 className="flex justify-center mb-2 text-xl font-bold">
                                      {report.reportName}
                                    </h2>
                                    <p>
                                      {" "}
                                      <span className="font-semibold">
                                        {" "}
                                        Date:
                                      </span>{" "}
                                      {formattedDate}
                                    </p>
                                    <p>
                                      <span className="font-semibold">
                                        {" "}
                                        Time:
                                      </span>{" "}
                                      {formattedTime}
                                    </p>
                                    <div className=" text-[#089BAB] text-m">
                                      Temperature :
                                      <span className="text-black">
                                        {report.temperature}
                                      </span>
                                    </div>
                                    <div className=" text-[#089BAB] text-m">
                                      Syptomps :
                                      <span className="text-black">
                                        {report.symptoms + " "}
                                      </span>
                                    </div>
                                    <p>
                                      Additional Notes: {report.additionalNotes}
                                    </p>
                                    <div className="flex justify-between mt-6">
                                      <div className="flex ">
                                        <div>
                                          <div className=" text-[#089BAB] text-xs">
                                            Date
                                          </div>
                                          <div className="mr-4 font-normal text-md text-slate-800">
                                            {formattedDate}
                                          </div>
                                        </div>
                                        <div>
                                          <div className=" text-[#089BAB] text-xs">
                                            Time
                                          </div>
                                          <div className="font-normal text-md text-slate-800 ">
                                            {formattedTime}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="">
                                        <div className="ml-4">
                                          {/* {patientDetails.fName} {patientDetails.lName} */}
                                        </div>
                                      </div>
                                    </div>
                                    <div class="w-64 h-64 mt-2  flex items-center justify-center text-indigo-500 border rounded-xl">
                                      <img
                                        src={report.documentURL}
                                        alt=""
                                        srcset=""
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <div></div>
                          <button
                            className="px-4 py-2 mb-2 text-red-500 border-2 border-red-500 rounded-3xl hover:bg-red-500 hover:text-white"
                            onClick={() => handleDelete(report._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="report">
          {medicalReports ? (
            <ScrollArea className="p-4 mx-20 border rounded-xl h-[580px]">
              {medicalReports.map((report) => (
                <div key={report._id}>
                  {/* Render each medical report */}
                  <div className="mb-4 px-6 py-4 border border-[#089BAB] rounded-2xl flex justify-between">
                    {/* Render medical report details */}
                    {/* You can customize this part based on your Report model */}
                    <h2 className="mb-2 text-xl font-bold">
                      {report.testName}
                    </h2>
                    {/* Other report details... */}
                    <Dialog>
                      <DialogTrigger className="px-4 py-2 mb-2 text-[#089BAB] border-2 border-[#089BAB] rounded-3xl hover:bg-[#089BAB] hover:text-white">
                        View
                      </DialogTrigger>
                      <DialogContent className="w-[50vw]">
                        <div className="popup">
                          <div className="popup-content">
                            <div className="">
                              <h2 className="flex justify-center mb-2 text-xl font-bold">
                                {report.reportName}
                              </h2>
                              <div class="w-64 h-64 mt-2  flex items-center justify-center text-indigo-500 border rounded-xl">
                                <img
                                  src={report.documentURL}
                                  alt=""
                                  srcset=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </ScrollArea>
          ) : (
            <p>Loading...</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportCard;

// note -stop working on this page until filter by patient id
