import React, { useState } from "react";
import { TbChecks } from "react-icons/tb";
import Input from "./Input";
import "../App.css";
import bg from "../assets/bg.png";
import DatePicker from "./DatePicker";

const Content = () => {
  const status = ["siswa", "kuliah"];
  const [isStatusActive, setisStatusActive] = useState(0);
  const [copyMessage, setCopyMessage] = useState("");
  const [inputs, setInputs] = useState({
    izin: "",
    kepada: "",
    nama: "",
    namaWali: "",
    namaGuru: "",
    tanggal: "",
  });
  const handleCopy = () => {
    navigator.clipboard.writeText(content[isStatusActive].text).then(
      function () {
        
        setCopyMessage("Teks berhasil disalin!");
        setTimeout(() => {
          setCopyMessage("");
        }, 2000); 
      },
      function (err) {
      
        setCopyMessage("Gagal menyalin teks.");
      }
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const time = new Date();
  const formatTime = (time) => {
    let hours = time.getHours().toString().padStart(2, "0");
    let minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}.${minutes}`;
  };

  function formatDateIndonesian(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  const content = [
    {
      title: "siswa",
      text: `Dengan hormat,\n\nSebagai wali dari ${
        inputs.nama 
      }, saya bermaksud untuk memberitahukan bahwa ${
        inputs.nama
      } tidak dapat hadir di sekolah pada ${formatDateIndonesian(
        inputs.tanggal
      )} dikarenakan ${
        inputs.izin
      }. Mohon kerjasamanya untuk memberikan informasi jika ada tugas atau kegiatan penting yang terlewat.\n\nDemikian surat izin ini saya sampaikan. Atas perhatian dan kerjasamanya saya ucapkan terima kasih.\n\nHormat saya,\n${
        inputs.namaWali
      }`,
    },
    {
      title: "kuliah",
      text: `Dengan hormat,\n\nSaya, ${
        inputs.nama
      }, bermaksud untuk memberitahukan bahwa saya tidak dapat menghadiri perkuliahan pada ${formatDateIndonesian(
        inputs.tanggal
      )} dikarenakan ${
        inputs.izin
      }. Mohon kerjasamanya untuk memberikan informasi jika ada tugas atau kegiatan penting yang terlewat.\n\nDemikian surat izin ini saya sampaikan. Atas perhatian dan kerjasamanya saya ucapkan terima kasih.\n\nHormat saya,\n${
        inputs.nama
      }`,
    },
  ];

  return (
    <div className="w-full flex justify-center mt-10 gap-10 md:px-20 px-5 items-center md:items-start flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <ul className="flex gap-5 ">
          {status.map((item, index) => (
            <li
              className={`${
                isStatusActive === index
                  ? "border-2 border-green-400 bg-green-400 text-white"
                  : "border-2 border-slate-300"
              } px-3 py-2 rounded-md cursor-pointer w-32 flex justify-center  transition-all duration-200`}
              key={index}
              onClick={() => setisStatusActive(index)}
            >
              {item}
            </li>
          ))}
        </ul>

        {isStatusActive === 0 ? (
          <>
            <Input
              label={"Nama Anak"}
              name="nama"
              onChange={handleInputChange}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"Alasan Izin"}
              name="izin"
              onChange={handleInputChange}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"Nama Wali"}
              name="namaWali"
              onChange={handleInputChange}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <DatePicker
              label="Tanggal Izin"
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
              name="tanggal"
              onChange={handleDateChange}
            />
          </>
        ) : (
          <>
            <Input
              label={"Nama"}
              name="nama"
              onChange={handleInputChange}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <Input
              label={"Alasan Izin"}
              name="izin"
              onChange={handleInputChange}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            />
            <DatePicker
              label="Tanggal Izin"
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500 w-full"
              name="tanggal"
              onChange={handleDateChange}
            />

            {/* <Input
              label={isStatusActive === 0 ? "Kepada" : "Nama Dosen"}
              name="kepada"
              onChange={handleInputChange}
              labelClass="mt-5 mb-2 uppercase font-semibold text-sm text-slate-500"
            /> */}
          </>
        )}
        <button
          onClick={handleCopy}
          className="mt-5 px-4 py-2 rounded-lg bg-green-500 text-white transition-all hover:bg-blue-600"
        >
          Salin Teks
        </button>

        {copyMessage && <p className="mt-3 text-green-500">{copyMessage}</p>}
      </div>

      {content.map(
        (item, index) =>
          index === isStatusActive && (
            <div key={index} className="w-full">
              <div className="flex relative rounded-md mt-2 justify-end w-full bg-slate-700 overflow-hidden">
                <img
                  src={bg}
                  alt="bg"
                  className="w-full h-full object-cover absolute"
                />
                <div className="chat-bubble relative w-64 p-2 bg-[#D9FDD3] mt-10 float-right mb-10 mr-5 rounded-lg">
                  <div className="break-words mb-3">{item.text}</div>
                  <div className="absolute bottom-1 right-2 text-[#64C5E8] flex gap-2 items-center">
                    <p className="text-slate-500 text-xs">{`${formatTime(
                      time
                    )}`}</p>
                    <TbChecks />
                  </div>
                </div>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Content;
