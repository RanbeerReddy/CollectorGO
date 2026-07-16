from enum import Enum


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    SUPERVISOR = "SUPERVISOR"
    FIELD_WORKER = "FIELD_WORKER"


class AssignmentStatus(str, Enum):
    PENDING = "PENDING"
    COMPLETED = "COMPLETED"