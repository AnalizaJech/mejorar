// Clear old services on page load to force reinitialization with comprehensive services
if (typeof(Storage) !== 'undefined') {
  localStorage.removeItem('veterinary_services');
  console.log('Cleared old veterinary services from localStorage - will reinitialize with comprehensive services');
}
