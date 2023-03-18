package api_messages

// Registry errors
const (
	ErrRegistryExists     = "registry with this name already exists"
	ErrRegistryNotExists  = "registry with this name does not exists"
	ErrRegistryAuthFailed = "Authentication failed for given credentials"
	ErrRegistryIdMissing  = "registry id is missing"
)
