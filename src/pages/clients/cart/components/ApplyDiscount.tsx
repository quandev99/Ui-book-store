import AppLyModal from '~/components/Modals/AppLyModal';
const ApplyDiscount = ({ discountId, isModalOpen, setIsModalOpen, refetch }) => {
  return (
    <div>
      <AppLyModal
        discountId={discountId}
        isAddAppLyVisible={isModalOpen}
        setIsAddAppLyVisible={setIsModalOpen}
        refetch={refetch}
      ></AppLyModal>
    </div>
  )
}

export default ApplyDiscount
