// File: UserMedicalProfileDetail.js
// --- BẮT ĐẦU CODE ---

import { useState, useEffect } from "react"
import {
  Form,
  Input,
  Button,
  List, // Sử dụng List để hiển thị danh sách gọn gàng hơn
  Space,
  Typography,
  message,
  Modal,
  Select,
  Checkbox,
  Spin,
} from "antd"
import dayjs from "dayjs"

const { Title, Text } = Typography
const { Option } = Select

// Component con để hiển thị danh sách lựa chọn trong Modal
const ProfileSelectionList = ({ profiles, onSelect }) => (
  <List
    itemLayout="horizontal"
    dataSource={profiles}
    renderItem={(profile) => (
      <List.Item
        actions={[
          <Button type="primary" onClick={() => onSelect(profile)}>
            Select
          </Button>,
        ]}>
        <List.Item.Meta
          title={<Text strong>{profile.name}</Text>}
          description={`Date of Birth: ${dayjs(profile.dateOfBirth).format(
            "DD/MM/YYYY"
          )} - Gender: ${profile.gender}`}
        />
      </List.Item>
    )}
  />
)

const UserMedicalProfileDetail = () => {
  const [modalForm] = Form.useForm()

  // State quản lý UI chính
  const [identityToSearch, setIdentityToSearch] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // State quản lý Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalView, setModalView] = useState("list") // 'list' hoặc 'edit'
  const [foundProfiles, setFoundProfiles] = useState([])
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  // State cho dữ liệu phụ (dịch vụ, thuốc)
  const [services, setServices] = useState([])
  const [medicines, setMedicines] = useState([])
  const [isMedicineLoading, setIsMedicineLoading] = useState(false)

  // --- I. HÀM GỌI API ---

  // 1. Lấy danh sách dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:9999/api/services")
        if (!response.ok) throw new Error("Failed to fetch services")
        const data = await response.json()
        setServices(data)
      } catch (error) {
        message.error(error.message)
      }
    }
    fetchServices()
  }, [])

  // 2. Tìm kiếm hồ sơ và mở popup lựa chọn
  const handleSearchAndShowSelection = async () => {
    if (!identityToSearch.trim()) {
      message.warn("Please enter an Identity Number.")
      return
    }
    setIsSearching(true)
    try {
      const response = await fetch(
        `http://localhost:9999/api/doctor/by-identity/${identityToSearch}`
      )
      if (!response.ok && response.status !== 404) {
        throw new Error("An error occurred while searching for profiles.")
      }
      const result = await response.json()
      const profilesData = result.data || []

      if (profilesData.length === 0) {
        message.info("No profiles found for this identity number.")
      } else {
        setFoundProfiles(profilesData)
        setModalView("list") // Đặt chế độ xem là danh sách
        setIsModalOpen(true) // Mở Modal
      }
    } catch (error) {
      message.error(error.message)
    } finally {
      setIsSearching(false)
    }
  }

  // 3. Tìm kiếm thuốc
  const handleMedicineSearch = async (searchText) => {
    if (searchText && searchText.length > 1) {
      setIsMedicineLoading(true)
      try {
        const response = await fetch(
          `http://localhost:9999/api/medicines?search=${searchText}`
        )
        const data = await response.json()
        setMedicines(data)
      } catch (error) {
        setMedicines([])
      } finally {
        setIsMedicineLoading(false)
      }
    } else {
      setMedicines([])
    }
  }

  // 4. Gửi dữ liệu cập nhật
  const handleUpdateProfile = async (values) => {
    setIsUpdating(true)
    try {
      const response = await fetch(
        `http://localhost:9999/api/doctor/${selectedProfile._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update profile.")
      }
      message.success("Profile updated successfully!")
      handleCloseModal() // Đóng và reset mọi thứ
    } catch (error) {
      message.error(error.message)
    } finally {
      setIsUpdating(false)
    }
  }

  // --- II. HÀM XỬ LÝ GIAO DIỆN ---

  // Chuyển từ màn hình danh sách sang màn hình chỉnh sửa
  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile)
    modalForm.setFieldsValue({
      service: profile.service || [],
      diagnose: profile.diagnose || "",
      note: profile.note || "",
      issues: profile.issues || "",
      medicine: profile.medicine || [],
    })
    setModalView("edit") // Chuyển sang chế độ chỉnh sửa
  }

  // Quay lại màn hình danh sách từ màn hình chỉnh sửa
  const handleBackToList = () => {
    setSelectedProfile(null)
    modalForm.resetFields()
    setModalView("list")
  }

  // Đóng và reset hoàn toàn modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFoundProfiles([])
    setSelectedProfile(null)
    modalForm.resetFields()
    // Không reset identityToSearch để người dùng có thể thấy số họ vừa tìm
  }

  // --- III. RENDER COMPONENT ---

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "auto" }}>
      <Title level={3}>Find Patient Profiles</Title>

      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Enter Patient's Identity Number (CCCD/CMND)"
          value={identityToSearch}
          onChange={(e) => setIdentityToSearch(e.target.value)}
          onPressEnter={handleSearchAndShowSelection}
        />
        <Button
          type="primary"
          onClick={handleSearchAndShowSelection}
          loading={isSearching}>
          Find Profiles
        </Button>
      </Space.Compact>

      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        width={modalView === "list" ? 600 : 800}
        title={
          modalView === "list"
            ? "Select a Profile"
            : `Editing Profile: ${selectedProfile?.name}`
        }
        footer={
          modalView === "list"
            ? [
                <Button key="cancelList" onClick={handleCloseModal}>
                  Cancel
                </Button>,
              ]
            : [
                <Button key="back" onClick={handleBackToList}>
                  Back to List
                </Button>,
                <Button key="cancelEdit" onClick={handleCloseModal}>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={isUpdating}
                  onClick={() => modalForm.submit()}>
                  Update Profile
                </Button>,
              ]
        }>
        {modalView === "list" ? (
          <ProfileSelectionList
            profiles={foundProfiles}
            onSelect={handleProfileSelect}
          />
        ) : (
          <Form
            form={modalForm}
            layout="vertical"
            onFinish={handleUpdateProfile}>
            <Form.Item
              name="service"
              label="1. Services"
              rules={[
                {
                  required: true,
                  message: "Please select at least one service.",
                },
              ]}>
              <Checkbox.Group>
                <Space direction="vertical">
                  {services.map((s) => (
                    <Checkbox key={s._id} value={s._id}>
                      {s.name} - ${s.price}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              name="diagnose"
              label="2. Diagnose"
              rules={[
                { required: true, message: "Diagnose cannot be empty." },
              ]}>
              <Input.TextArea
                rows={4}
                placeholder="Enter the diagnosis details..."
              />
            </Form.Item>
            <Form.Item name="note" label="3. Doctor's Note">
              <Input.TextArea
                rows={2}
                placeholder="Enter any additional notes..."
              />
            </Form.Item>
            <Form.Item name="issues" label="4. Patient's Reported Issues">
              <Input.TextArea
                rows={2}
                placeholder="Describe the issues reported by the patient..."
              />
            </Form.Item>
            <Form.Item name="medicine" label="5. Prescribe Medicine">
              <Select
                mode="multiple"
                allowClear
                showSearch
                placeholder="Search and select medicines..."
                onSearch={handleMedicineSearch}
                loading={isMedicineLoading}
                filterOption={false}
                notFoundContent={
                  isMedicineLoading ? <Spin size="small" /> : null
                }>
                {medicines.map((med) => (
                  <Option key={med._id} value={med._id}>
                    {med.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default UserMedicalProfileDetail
// --- KẾT THÚC CODE ---
