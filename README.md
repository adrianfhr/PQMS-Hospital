# Patient Queue Management System (PQMS) - README
PQMS (Patient Queue Management System) adalah aplikasi berbasis web yang bertujuan memudahkan manajemen antrian pasien di rumah sakit atau klinik. Aplikasi ini memungkinkan pengguna untuk membuat janji temu, melihat live antrian, mengelola janji temu, dan memberikan masukan. PQMS dirancang untuk meningkatkan efisiensi dalam pelayanan kesehatan dengan menyederhanakan proses administrasi dan memberikan visibilitas pada antrian pasien.

## Set Up & Installation
- Clone repositori
```
"https://gitlab.informatika.org/k3_gd/IF3152-2023-K03-GD-PQMS.git"
```
- Install dependencies untuk nodejs
```
npm i
```
- Buat virtual env Python
```
python -m venv env
```
- Aktifkan virtual env python
```
./env/Scripts/activate
```
- Install Python depedencies
```
pip3 install -r requirements.txt
```
- Jalankan aplikasi
```
npm run dev
```

## Branching
Setiap membuat branch baru harus ambil base dari `master`. Untuk penamaan branch mengikuti format berikut.
Format branch: `<name>/feature/<title>`

## Pull Request and Commit Messages
Untuk melakukan commit message mengikuti format berikut.
Format commit message: `<type>: <message>`

Untuk `type` mengikuti semantic berikut.
- `feat`: (menambahkan fitur baru)
- `fix`: (melakukan bug fix)
- `style`: (melakukan formatting pada code, tidak ada perubahan pada aplikasi)
- `refactor`: (melakukan refactor)
- `test`: (menambahkan test)
- `doc`: (menambahkan dokumentasi atau file assets)

Contoh: 
- `feat(homepage): add landingpage`
- `(fix): typos in commit message conventions`

Setiap merge request harus di-review oleh minimal 1 anggota (selain yang membuat merge request) dari kelompok tersebut. Setelah melakukan code review, berikan comment ataupun like sebagai bukti.

## Use Case
### 1. Membuat Janji Temu
18221002 Adrian Fahri Affandi

Capture Screen:

![Membuat Janji Temu](/doc/homepage.png)
![Membuat Janji Temu](/doc/navbar.png)

### 2. Melihat Spesialisasi Layanan
18221019 Anindita Putri Paramarta

Capture Screen:

![Melihat Spesialisasi Layanan](/doc/spesialisasi.png)


### 3. Melihat Daftar Dokter
18221015 Fariz Putra Hanggara

Capture Screen:

![Melihat Daftar Dokter](/doc/daftardokterspesialis.png)


### 4. Melihat Jadwal Dokter
18221019 Anindita Putri Paramarta

Capture Screen:

!![Melihat Jadwal Dokter](/doc/buatjanjitemu.png)


### 4. Melihat Janji Temu
18221002 Adrian Fahri Affandi

Capture Screen:

!![Melihat Janji Temu](/doc/cekjanjitemu.png)

### 5. Melihat Antrian Real-Time
18221015 Fariz Putra Hanggara

Capture Screen:

!![Melihat Antrian Real-Time](/doc/liveantrian.png)

### 6. Memberikan Feedback
18221002 Adrian Fahri Affandi

Capture Screen:

!![Memberikan Feedback](/doc/berimasukan.png)

### 8. Register
18221015 Fariz Putra Hanggara

Capture Screen:

!![Register](/doc/register.png)

### 9. Login
18221002 Adrian Fahri Affandi

Capture Screen:

!![Login](/doc/login.png)

### 10. Kofirmasi Janji Temu
18221015 Fariz Putra Hanggara

Capture Screen:

!![Konfirmasi Janji Temu](/doc/konfirmasijanjitemu.png)

## Database
### Tabel appointment
| id  | is_confirmed | id_user                               | id_schedule | id_doctor | is_done |
| --- | ------------ | -------------------------------------- | ----------- | --------- | ------- |
| 51  | false        | 7670ca01-2342-4f22-af05-c6a8c586159c | 98          | 21        | false   |
| 52  | false        | cccd8e4d-5195-4da3-a127-c380f9bc0f39 | 11          | 5         | false   |
| 53  | false        | 0fd8ae16-e6e1-4225-a6d9-91d63b998776 | 11          | 5         | false   |
| 5   | false        | fa729577-73ff-4688-9251-3fd4683daf39 | 1           | 8         | false   |
| 6   | false        | fa729577-73ff-4688-9251-3fd4683daf39 | 1           | 1         | false   |

### Tabel doctor_schedule
| id  | id_doctor | date       | time_start | time_end |
|-----|-----------|------------|------------|----------|
| 1   | 1         | 2023-11-28 | 10         | 15       |
| 2   | 1         | 2023-12-05 | 10         | 15       |
| 3   | 1         | 2023-12-12 | 10         | 15       |
| 4   | 1         | 2023-12-19 | 10         | 15       |
| 5   | 1         | 2023-12-26 | 10         | 15       |

### Tabel doctors
| id  | name               | spesialisasi                               |
| --- | ------------------ | ------------------------------------------ |
| 1   | Dr. Agus Setiawan  | Anak - Konsultan Inspeksi Penyakit Tropis  |
| 2   | Dr. Budi Prasetyo  | Anak - Konsultan Inspeksi Penyakit Tropis  |
| 3   | Dr. Cita Dewi      | Anak - Konsultan Inspeksi Penyakit Tropis  |
| 4   | Dr. Darmawan       | Anak - Tumbuh Kembang Anak                 |
| 5   | Dr. Eka Putri      | Anak - Tumbuh Kembang Anak                 |

### Tabel feedback
| id  | created_at                      | name                     | email                             | rating | comment                                   |
| --- | ------------------------------- | ------------------------ | ---------------------------------- | ------ | ----------------------------------------- |
|  1  | 2023-11-25 06:58:06.24687+00   | Sheila                    | sheilaandini17@gmail.com         | 5      | Sudah bagus!                              |
|  2  | 2023-11-25 09:40:29.451727+00  | Ditra                     | ditrarizqaamadia@gmail.com        | 5      | Keren euy                                 |                          |
|  3  | 2023-11-25 13:28:19.53706+00   | Audina Dwiyunita Putri    | audinaputri0707@gmail.com         | 5      | Sangat mudah di gunakan                   |

### Tabel profiles
| id                                   | updated_at                     | full_name                 | email                         | address                          |
| ------------------------------------ | ------------------------------ | ------------------------- | ----------------------------- | -------------------------------- |
| fa729577-73ff-4688-9251-3fd4683daf39 | 2023-11-03 17:20:10.331+00    | Adrian Fahri Affandi     | adrianfahriaffandi@gmail.com | Jl Tropika VIII B3 No 3         |
| bcf52663-d059-4e88-915c-3781270de50e | 2023-11-22 03:41:55.028303+00 | Adrian Fahri Affandi     | adrianfhrr@gmail.com          | Jl Jaguar Raya U2 No.17         |
| 8ddbf04a-4028-40b2-bdef-22e1e36682cb | 2023-11-22 04:03:09.498005+00 | Harits Afiq N            | hanoefiq@gmail.com            | Nangor                           |
| f657c9ba-690a-4010-b51a-f2becc58c05e | 2023-11-23 17:12:11.08929+00  | Anindita Putri Paramarta | anindita.paramarta@gmail.com  | Jl Puri Indah No.24 Jatinangor |

## Deployment
[PQMS Hospital](https://pqms-hospital.vercel.app//).