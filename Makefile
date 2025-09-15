BACKEND=backend
FRONTEND=frontend
PYTHON=.venv\Scripts\python
UVICORN=$(PYTHON) -m uvicorn

.PHONY: backend frontend dev install-backend install-frontend test-backend

backend:
	cd $(BACKEND) && $(UVICORN) src.main:app --reload

frontend:
	cd $(FRONTEND) && npm run dev

dev:
	start cmd /k "make backend"
	start cmd /k "make frontend"

install-backend:
	cd $(BACKEND) && pip install -e . && pip install -r requirements.txt

install-frontend:
	cd $(FRONTEND) && npm install

test-backend:
	cd $(BACKEND) && $(PYTHON) -m pytest tests/