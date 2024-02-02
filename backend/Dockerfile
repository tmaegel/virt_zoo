FROM python:3.12-slim-bookworm

ENV PATH="/home/worker/.local/bin:${PATH}"

RUN chown _apt . && \
    apt-get update && \
    apt-get --assume-yes --no-install-recommends --no-install-suggests install \
      curl \
      python3-postgresql \
    && rm -rf /var/lib/apt/lists/*

RUN adduser --disabled-password --gecos "" --home /home/worker --shell /bin/bash worker
USER worker

WORKDIR /home/worker

COPY --chown=worker:worker . .
RUN pip install --user --upgrade pip && pip install --user -r requirements.txt

ENTRYPOINT ["./entrypoint.sh"]
